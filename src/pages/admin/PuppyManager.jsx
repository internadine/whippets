import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const PuppyManager = () => {
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    weight: '',
    description: '',
    status: 'unavailable',
    isParent: false,
    traits: [],
    parents: {
      mother: '',
      father: ''
    }
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [filter, setFilter] = useState('all'); // all, parents

  useEffect(() => {
    fetchPuppies();
  }, []);

  const fetchPuppies = async () => {
    try {
      const puppiesRef = collection(db, 'puppies');
      const snapshot = await getDocs(puppiesRef);
      const puppiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPuppies(puppiesData);
    } catch (error) {
      console.error('Error fetching puppies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (files) => {
    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const storageRef = ref(storage, `puppies/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(url);
      }
      setImages(prev => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const puppyData = {
        ...formData,
        images,
        updatedAt: new Date().toISOString()
      };

      if (selectedPuppy) {
        await updateDoc(doc(db, 'puppies', selectedPuppy.id), puppyData);
      } else {
        const docRef = await addDoc(collection(db, 'puppies'), {
          ...puppyData,
          createdAt: new Date().toISOString()
        });
        console.log('Document written with ID: ', docRef.id);
      }

      setIsModalOpen(false);
      setSelectedPuppy(null);
      resetForm();
      fetchPuppies();
    } catch (error) {
      console.error('Error saving puppy:', error);
      alert(`Error saving puppy: ${error.message}`);
    }
  };

  const handleEdit = (puppy) => {
    setSelectedPuppy(puppy);
    setFormData({
      name: puppy.name,
      birthDate: puppy.birthDate,
      weight: puppy.weight,
      description: puppy.description,
      status: puppy.status,
      isParent: puppy.isParent,
      traits: puppy.traits || [],
      parents: puppy.parents || { mother: '', father: '' }
    });
    setImages(puppy.images || []);
    setIsModalOpen(true);
  };

  const handleDelete = async (puppyId) => {
    if (window.confirm('Are you sure you want to delete this puppy?')) {
      try {
        await deleteDoc(doc(db, 'puppies', puppyId));
        fetchPuppies();
      } catch (error) {
        console.error('Error deleting puppy:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      birthDate: '',
      weight: '',
      description: '',
      status: 'unavailable',
      isParent: false,
      traits: [],
      parents: { mother: '', father: '' }
    });
    setImages([]);
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      handleImageUpload(files);
    }
  }, []);

  const filteredPuppies = puppies.filter(puppy => {
    if (filter === 'all') return true;
    if (filter === 'parents') return puppy.isParent;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-whippet-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Puppies
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'all'
                    ? 'bg-whippet-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('parents')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'parents'
                    ? 'bg-whippet-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Parents
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Puppy</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPuppies.map((puppy) => (
            <div key={puppy.id} className="bg-white rounded-whippet shadow-md overflow-hidden">
              {puppy.images?.[0] && (
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={puppy.images[0]}
                    alt={puppy.name}
                    className="w-full h-48 object-cover"
                  />
                  {puppy.isParent && (
                    <div className="absolute top-4 left-4 bg-whippet-600 text-white px-3 py-1 rounded-full text-sm">
                      Parent
                    </div>
                  )}
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{puppy.name}</h2>
                    <p className="text-sm text-gray-500">{puppy.birthDate}</p>
                    {(puppy.parents?.mother || puppy.parents?.father) && (
                      <div className="mt-1 text-sm text-gray-500">
                        {puppy.parents.mother && <span>Mother: {puppy.parents.mother}</span>}
                        {puppy.parents.mother && puppy.parents.father && <span> • </span>}
                        {puppy.parents.father && <span>Father: {puppy.parents.father}</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(puppy)}
                      className="p-2 text-gray-600 hover:text-whippet-600"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(puppy.id)}
                      className="p-2 text-gray-600 hover:text-red-600"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-600 line-clamp-2">{puppy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Puppy Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-whippet max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">
              {selectedPuppy ? 'Edit Puppy' : 'Add Puppy'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500 px-4 py-3"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500 px-4 py-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500 px-4 py-3"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500 px-4 py-3"
                >
                  <option value="unavailable">Found New Home</option>
                  <option value="available">Available</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isParent"
                  checked={formData.isParent}
                  onChange={(e) => setFormData({ ...formData, isParent: e.target.checked })}
                  className="h-4 w-4 text-whippet-600 focus:ring-whippet-500 border-gray-300 rounded"
                />
                <label htmlFor="isParent" className="text-sm font-medium text-gray-700">
                  Mark as Parent
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500 px-4 py-3"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother
                  </label>
                  <input
                    type="text"
                    value={formData.parents.mother}
                    onChange={(e) => setFormData({
                      ...formData,
                      parents: { ...formData.parents, mother: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father
                  </label>
                  <input
                    type="text"
                    value={formData.parents.father}
                    onChange={(e) => setFormData({
                      ...formData,
                      parents: { ...formData.parents, father: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-whippet-500 focus:border-whippet-500 px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`mt-1 flex justify-center px-6 py-6 border-2 ${
                    isDragging 
                      ? 'border-whippet-500 bg-whippet-50' 
                      : 'border-gray-300 border-dashed'
                  } rounded-lg hover:border-whippet-500 transition-all`}
                >
                  <div className="text-center">
                    <div className="flex flex-col items-center">
                      <PlusIcon className={`mx-auto h-12 w-12 ${
                        isDragging ? 'text-whippet-500' : 'text-gray-400'
                      } transition-colors`} />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-whippet-600 hover:text-whippet-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-whippet-500">
                          <span className="inline-flex items-center px-4 py-2 border border-whippet-300 shadow-sm text-sm font-medium rounded-md text-whippet-600 bg-white hover:bg-whippet-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-whippet-500">
                            Select Files
                          </span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleImageUpload(Array.from(e.target.files))}
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {isDragging 
                          ? 'Drop to upload'
                          : 'Drag or click to select files'}
                      </p>
                    </div>
                  </div>
                </div>
                {uploading && (
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-whippet-600 border-t-transparent mr-2"></div>
                    Uploading
                  </div>
                )}
                {images.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Images</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {images.map((url, index) => (
                        <div key={index} className="relative group">
                          <img src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                          >
                            <TrashIcon className="h-6 w-6 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-8"
                  disabled={uploading}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuppyManager; 
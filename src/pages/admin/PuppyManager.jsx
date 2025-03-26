import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import AdminNav from '../../components/AdminNav';

const BorderWhippetManager = () => {
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    weight: '',
    description: '',
    status: 'adopted',
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
        const isVideo = file.type.startsWith('video/');
        const folder = isVideo ? 'videos' : 'puppies';
        const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        uploadedUrls.push({
          url,
          type: isVideo ? 'video' : 'image',
          name: file.name
        });
      }
      setImages(prev => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading files:', error);
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
      status: 'adopted',
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
      file.type.startsWith('image/') || file.type.startsWith('video/')
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
    <div className="min-h-screen bg-cream-50">
      <AdminNav />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Border Whippets
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('parents')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'parents'
                    ? 'bg-purple-600 text-white'
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
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 shadow-sm transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Border Whippet</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPuppies.map((puppy) => (
            <div key={puppy.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
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
                      className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(puppy.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  {puppy.images?.[0] && (
                    <div className="sm:w-1/3 mb-3 sm:mb-0">
                      <div className="relative">
                        {typeof puppy.images[0] === 'object' && puppy.images[0].type === 'video' ? (
                          <video
                            src={puppy.images[0].url}
                            className="w-full h-32 object-cover rounded-lg"
                            controls
                          ></video>
                        ) : (
                          <img
                            src={typeof puppy.images[0] === 'object' ? puppy.images[0].url : puppy.images[0]}
                            alt={puppy.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        )}
                        {puppy.isParent && (
                          <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs">
                            Parent Whippet
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className={puppy.images?.[0] ? "sm:w-2/3" : "w-full"}>
                    <p className="text-gray-600 line-clamp-3">{puppy.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Puppy Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                {selectedPuppy ? 'Edit Border Whippet' : 'Add Border Whippet'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="adopted">Found New Home</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="e.g., 2.5 kg"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id="isParent"
                    checked={formData.isParent}
                    onChange={(e) => setFormData({ ...formData, isParent: e.target.checked })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isParent" className="text-sm font-medium text-gray-700">
                    Mark as Parent
                  </label>
                </div>
                <p className="text-xs text-gray-500">Parent Border Whippets will be displayed with a special badge and can be filtered separately.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Enter details about the Border Whippet..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Mother's name"
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Father's name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos & Videos
                </label>
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 ${
                    isDragging 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-300 border-dashed'
                  } rounded-lg p-8 transition-all duration-200 ease-in-out hover:border-purple-500`}
                >
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`mx-auto h-12 w-12 ${
                      isDragging ? 'text-purple-500' : 'text-gray-400'
                    } transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="mt-4 flex flex-col items-center">
                      <p className="text-sm text-gray-500">
                        {isDragging 
                          ? 'Drop images or videos to upload'
                          : 'Drag and drop files here'}
                      </p>
                      <label className="mt-2 cursor-pointer">
                        <span className="inline-flex items-center px-4 py-2 border border-purple-300 shadow-sm text-sm font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                          Select Files
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={(e) => handleImageUpload(Array.from(e.target.files))}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {uploading && (
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-600 border-t-transparent"></div>
                    <p className="text-sm text-gray-500">Uploading files...</p>
                  </div>
                )}

                {images.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      File Preview
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.map((file, index) => (
                        <div key={index} className="relative group aspect-square">
                          {typeof file === 'object' && file.type === 'video' ? (
                            <video
                              src={file.url}
                              controls
                              className="w-full h-full object-cover rounded-lg"
                            ></video>
                          ) : (
                            <img
                              src={typeof file === 'object' ? file.url : file}
                              alt=""
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                            className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white rounded-full text-gray-600 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default BorderWhippetManager; 
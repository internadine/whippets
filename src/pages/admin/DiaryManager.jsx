import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import { PencilIcon, TrashIcon, PlusIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DiaryManager = () => {
  const [entries, setEntries] = useState([]);
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'general',
    puppyId: 'family' // Default to family diary
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    Promise.all([fetchEntries(), fetchPuppies()]).then(() => {
      setLoading(false);
    });
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
    }
  };

  const fetchEntries = async () => {
    try {
      const entriesRef = collection(db, 'diary');
      const q = query(entriesRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const entriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntries(entriesData);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleImageUpload = async (files) => {
    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const storageRef = ref(storage, `diary/${Date.now()}_${file.name}`);
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
      const entryData = {
        ...formData,
        images,
        updatedAt: new Date().toISOString()
      };

      if (selectedEntry) {
        await updateDoc(doc(db, 'diary', selectedEntry.id), entryData);
      } else {
        await addDoc(collection(db, 'diary'), {
          ...entryData,
          createdAt: new Date().toISOString()
        });
      }

      setIsModalOpen(false);
      setSelectedEntry(null);
      resetForm();
      fetchEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      date: entry.date,
      category: entry.category || 'general',
      puppyId: entry.puppyId || 'family'
    });
    setImages(entry.images || []);
    setIsModalOpen(true);
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteDoc(doc(db, 'diary', entryId));
        fetchEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'general',
      puppyId: 'family'
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

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

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
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Diary Entries
          </h1>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Entry</span>
          </button>
        </div>

        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-whippet shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{entry.title}</h2>
                    <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 text-gray-600 hover:text-whippet-600"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-gray-600 hover:text-red-600"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{entry.content}</p>
                {entry.images?.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {entry.images.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt=""
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entry Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                {selectedEntry ? 'Edit Entry' : 'Create New Entry'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-whippet-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-whippet-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-whippet-500 focus:border-transparent transition-all"
                  >
                    <option value="general">General</option>
                    <option value="milestone">Milestone</option>
                    <option value="health">Health</option>
                    <option value="training">Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Puppy
                  </label>
                  <select
                    value={formData.puppyId}
                    onChange={(e) => setFormData({ ...formData, puppyId: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-whippet-500 focus:border-transparent transition-all"
                  >
                    <option value="family">Family Diary (All Puppies)</option>
                    {puppies.map((puppy) => (
                      <option key={puppy.id} value={puppy.id}>
                        {puppy.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-whippet-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos
                </label>
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 ${
                    isDragging 
                      ? 'border-whippet-500 bg-whippet-50' 
                      : 'border-gray-300 border-dashed'
                  } rounded-lg p-8 transition-all duration-200 ease-in-out hover:border-whippet-500`}
                >
                  <div className="text-center">
                    <PhotoIcon className={`mx-auto h-12 w-12 ${
                      isDragging ? 'text-whippet-500' : 'text-gray-400'
                    } transition-colors`} />
                    <div className="mt-4 flex flex-col items-center">
                      <p className="text-sm text-gray-500">
                        {isDragging 
                          ? 'Drop images to upload'
                          : 'Drag and drop images here'}
                      </p>
                      <label className="mt-2 cursor-pointer">
                        <span className="inline-flex items-center px-4 py-2 border border-whippet-300 shadow-sm text-sm font-medium rounded-md text-whippet-600 bg-white hover:bg-whippet-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-whippet-500 transition-colors">
                          Browse Files
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
                  </div>
                </div>

                {uploading && (
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-whippet-600 border-t-transparent"></div>
                    <p className="text-sm text-gray-500">Uploading images...</p>
                  </div>
                )}

                {images.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Image Preview
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.map((url, index) => (
                        <div key={index} className="relative group aspect-square">
                          <img
                            src={url}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white rounded-full text-gray-600 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                          >
                            <XMarkIcon className="h-4 w-4" />
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
                  className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default DiaryManager; 
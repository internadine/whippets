import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';

export const uploadPuppyImage = async (file) => {
  try {
    const storageRef = ref(storage, `puppies/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const generatePuppyDescription = async (puppyData) => {
  // This is a placeholder for AI text generation
  // You would typically call an AI service API here
  const traits = puppyData.traits?.join(', ') || '';
  return `Meet ${puppyData.name}, a charming whippet puppy with ${traits}. 
  This adorable pup was born on ${puppyData.birthDate} and has been bringing joy 
  to everyone around them. ${puppyData.name} comes from a loving family of whippets 
  and has inherited the breed's signature grace and gentle nature.`;
};

export const addPuppy = async (puppyData) => {
  try {
    const description = await generatePuppyDescription(puppyData);
    const docRef = await addDoc(collection(db, 'puppies'), {
      ...puppyData,
      description,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding puppy:', error);
    throw error;
  }
};

export const updatePuppy = async (puppyId, puppyData) => {
  try {
    const puppyRef = doc(db, 'puppies', puppyId);
    await updateDoc(puppyRef, {
      ...puppyData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating puppy:', error);
    throw error;
  }
};

export const deletePuppy = async (puppyId) => {
  try {
    await deleteDoc(doc(db, 'puppies', puppyId));
  } catch (error) {
    console.error('Error deleting puppy:', error);
    throw error;
  }
};

export const addPuppyUpdate = async (puppyId, updateData) => {
  try {
    const puppyRef = doc(db, 'puppies', puppyId);
    await updateDoc(puppyRef, {
      updates: updateData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding puppy update:', error);
    throw error;
  }
}; 
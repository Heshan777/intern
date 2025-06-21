import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

// Example function to get user data
export const getUserProfile = (uid) => {
  const userDocRef = doc(db, 'users', uid);
  return getDoc(userDocRef);
};

// Example function to post an internship
export const postInternshipJob = (jobData) => {
  const jobsCollectionRef = collection(db, 'jobs');
  return addDoc(jobsCollectionRef, jobData);
};

// Example function to get all jobs
export const getAllJobs = () => {
    const jobsCollectionRef = collection(db, 'jobs');
    return getDocs(jobsCollectionRef);
}
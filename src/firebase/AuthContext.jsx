import React, { createContext, useState, useEffect } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '../firebase/config';

const auth = getAuth(app);
const db = getFirestore(app);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- SIGNUP FUNCTION (WITH ADDED LOGGING AND ERROR HANDLING) ---
  const signup = async (email, password, userData, userType) => {
    console.log(`[signup] Starting signup for userType: ${userType}`);
    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const authUser = userCredential.user;
      console.log(`[signup] 1. User CREATED in Auth. UID: ${authUser.uid}`);

      // 2. Prepare data for Firestore
      const userDocData = {
        uid: authUser.uid,
        email: authUser.email,
        ...userData,
      };
      console.log(`[signup] 2. Preparing to create document in Firestore in collection '${userType}'`);

      // 3. Create a document in Firestore
      await setDoc(doc(db, userType, authUser.uid), userDocData);
      console.log(`[signup] 3. Firestore document CREATED successfully!`);

      // 4. Set the user state
      const finalUserData = { ...userDocData, role: userType };
      setUser(finalUserData);
      console.log(`[signup] 4. User state set in context.`);
      return finalUserData;

    } catch (error) {
      // This will catch any error during the process
      console.error("!!! [signup] AN ERROR OCCURRED:", error);
      throw error; // Re-throw the error so the UI can handle it
    }
  };

  // --- LOGIN FUNCTION (NO CHANGES NEEDED, BUT HERE FOR COMPLETENESS) ---
  const login = async (email, password, userType) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const authUser = userCredential.user;
    const docRef = doc(db, userType, authUser.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await signOut(auth);
      throw new Error("Login failed: User role does not match the login page.");
    }
    const userData = { uid: authUser.uid, email: authUser.email, role: userType, ...docSnap.data() };
    setUser(userData);
    return userData;
  };
  
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // --- USEEFFECT FOR PERSISTENCE (WITH ADDED LOGGING) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      console.log("[onAuthStateChanged] Auth state changed. User from Firebase:", authUser ? authUser.uid : null);
      
      if (authUser) {
        console.log("[onAuthStateChanged] User is authenticated. Checking Firestore...");
        
        // Check 'students' collection
        const studentDoc = await getDoc(doc(db, 'students', authUser.uid));
        console.log(`[onAuthStateChanged] Checked 'students' collection. Document exists: ${studentDoc.exists()}`);

        if (studentDoc.exists()) {
          const userData = { uid: authUser.uid, email: authUser.email, role: 'students', ...studentDoc.data() };
          setUser(userData);
          console.log("[onAuthStateChanged] User identified as STUDENT and set in context:", userData);
        } else {
          // If not in students, check companies
          console.log("[onAuthStateChanged] Not a student. Checking 'companies' collection...");
          const companyDoc = await getDoc(doc(db, 'companies', authUser.uid));
          console.log(`[onAuthStateChanged] Checked 'companies' collection. Document exists: ${companyDoc.exists()}`);
          
          if (companyDoc.exists()) {
            const userData = { uid: authUser.uid, email: authUser.email, role: 'companies', ...companyDoc.data() };
            setUser(userData);
            console.log("[onAuthStateChanged] User identified as COMPANY and set in context:", userData);
          } else {
            console.warn("[onAuthStateChanged] User exists in Auth but NOT in Firestore DB. Logging out.");
            setUser(null);
            await signOut(auth);
          }
        }
      } else {
        setUser(null);
        console.log("[onAuthStateChanged] No authenticated user. User state set to null.");
      }
      
      setLoading(false);
      console.log("[onAuthStateChanged] Loading complete.");
    });
    
    return () => unsubscribe();
  }, []);

  const value = { user, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
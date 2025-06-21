// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getFirestore } from "firebase/firestore"; // Import getFirestore for database
//import { getAnalytics } from "firebase/analytics"; // Import getAnalytics for analytics (if used)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS6VzWgYiAZ6OZqnE84ZqAwJt7ZNJdaJM",
  authDomain: "appmy-9c37d.firebaseapp.com",
  projectId: "appmy-9c37d",
  storageBucket: "appmy-9c37d.firebasestorage.app",
  messagingSenderId: "1022117125602",
  appId: "1:1022117125602:web:6fb716bfe8d916d9696dbb",
  measurementId: "G-M9GL5G86G7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize analytics conditionally if you plan to use it





// If you want to export analytics, do it like this:
// export const analytics = analyticsInstance; // Only if you've decided to use/export it

// If you specifically want to export 'app' for some reason, you can do this:
export { app };  
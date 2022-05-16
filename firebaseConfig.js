import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, addDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Imgc00tAK1OeQtCL0WQmvt90fTQ4fko",
  authDomain: "apis-ultimate-guide.firebaseapp.com",
  projectId: "apis-ultimate-guide",
  storageBucket: "apis-ultimate-guide.appspot.com",
  messagingSenderId: "818309152290",
  appId: "1:818309152290:web:a1f270ce2d5a96b499947b",
  measurementId: "G-1R8C5BWX15",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const dbInstance = collection(database, "emails");

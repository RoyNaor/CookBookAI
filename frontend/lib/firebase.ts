import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtZfsG-_UhXnkVLHc5GyB_ORS1w1WCYM4",
  authDomain: "cookbookai-99ac3.firebaseapp.com",
  projectId: "cookbookai-99ac3",
  storageBucket: "cookbookai-99ac3.firebasestorage.app",
  messagingSenderId: "93533385509",
  appId: "1:93533385509:web:476ddb0c0f3f0ae4f3e0cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

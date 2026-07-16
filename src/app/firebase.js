import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCgKBPPDnRAnPp3tiZ1pC9f8Vn1DF4veg",
  authDomain: "weddinginvite-471b5.firebaseapp.com",
  projectId: "weddinginvite-471b5",
  storageBucket: "weddinginvite-471b5.firebasestorage.app",
  messagingSenderId: "601185419533",
  appId: "1:601185419533:web:8d2e6c8d2647744d777044",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
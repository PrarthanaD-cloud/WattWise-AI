import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVF9DvBKe5C77QhPcRptOr_GPpsLV0gww",
  authDomain: "wattwise-8f055.firebaseapp.com",
  projectId: "wattwise-8f055",
  storageBucket: "wattwise-8f055.firebasestorage.app",
  messagingSenderId: "823885543363",
  appId: "1:823885543363:web:4de9856723d6859187ef76",
  measurementId: "G-C26XWN4PQR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
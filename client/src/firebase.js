import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAND34JpxB7R9KlG343jNBM6JwXD2YQnes",
  authDomain: "wattwise-c6ebf.firebaseapp.com",
  projectId: "wattwise-c6ebf",
  storageBucket: "wattwise-c6ebf.firebasestorage.app",
  messagingSenderId: "404446714715",
  appId: "1:404446714715:web:f67b39d4c8b370500f987e",
  measurementId: "G-GDC9JSR1K0"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export default app;
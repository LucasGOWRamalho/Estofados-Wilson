// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkGn5j2AeX6BlzOZjNQZ9k-_L-UXTZkC4",
  authDomain: "base-de-dados-wilson.firebaseapp.com",
  projectId: "base-de-dados-wilson",
  storageBucket: "base-de-dados-wilson.firebasestorage.app",
  messagingSenderId: "772167008461",
  appId: "1:772167008461:web:6529b8e4180df293d1a984",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

export { database, app };

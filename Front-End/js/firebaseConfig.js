// Import necessary functions from Firebase SDKs
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYnRDT2Hewdu0OCrzA_5DnKanWJjr5Rdw",
  authDomain: "eletricitybillsyswebapp.firebaseapp.com",
  databaseURL: "https://eletricitybillsyswebapp-default-rtdb.firebaseio.com",
  projectId: "eletricitybillsyswebapp",
  storageBucket: "eletricitybillsyswebapp.firebasestorage.app",
  messagingSenderId: "167045613658",
  appId: "1:167045613658:web:e076a2d18618d605ee3063"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the app and auth for use in other parts of the application
export { app, auth };

// Sign-up function
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user.email);
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
};

// Login function
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Logged in as:', user.email);
  } catch (error) {
    console.error('Error logging in:', error.message);
  }
};
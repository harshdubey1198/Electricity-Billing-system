// auth.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebaseConfig';  // Import the Firebase config

const auth = getAuth(app);  // Initialize Authentication

// Example login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Logged in as:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error.message);
  }
};

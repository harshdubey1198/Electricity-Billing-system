// Import Firebase services and app initialization
import app from './firebaseConfig';  // Import the Firebase config
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { saveData, readData } from './database';  // Import the database functions

// Initialize Firebase services
const auth = getAuth(app);  // Initialize Authentication
const db = getDatabase(app);  // Initialize Database

// Handling the login form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Attempt to sign in with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user.email);

    // Optionally, store user details in localStorage or sessionStorage for persistent login
    localStorage.setItem('userEmail', user.email);

    // After successful login, fetch the user ID (you could also use the user's UID from Firebase)
    const userId = user.uid;

    // Example of saving bill data (this can be from form input or other sources)
    const billAmount = 100; // Replace with actual user input from a form or other sources
    saveData(userId, billAmount);  // Save the bill data

    // Optionally, read and log the bill data after saving
    readData(userId);

    // Redirect to the dashboard page after login (if using a multi-page app)
    window.location.href = 'dashboard.html';
  } catch (error) {
    // Handle login error
    console.error('Error logging in:', error.message);
    alert('Login failed. Please check your credentials and try again.');
  }
});

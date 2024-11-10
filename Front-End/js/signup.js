import { app } from '../js/firebaseConfig.js';  // Import the Firebase app config
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// Initialize Firebase services
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getDatabase(app);  // Initialize Firebase Realtime Database

// Handle signup form submission
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;  // Confirm password field

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        // Create user with email and password in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User created:', user.email);

        // Save additional user data to Firebase Realtime Database
        const userId = user.uid;  // Use the UID from Firebase Authentication
        const userRef = ref(db, 'users/' + userId);

        // Set user data in the Realtime Database
        await set(userRef, {
            username: name,
            email: email,
            createdAt: new Date().toISOString(),
        });

        console.log('User data saved to Realtime Database');

        // Optionally, redirect the user to another page after signup
        window.location.href = 'index.html';  // Redirect to login page after signup
    } catch (error) {
        console.error('Error signing up:', error.message);
        alert('Signup failed. Please try again.');
    }
});

import app from './firebaseConfig';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const recoveryForm = document.querySelector('form');
recoveryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Password reset email sent!');
        })
        .catch((error) => {
            alert('Failed to send reset email: ' + error.message);
        });
});

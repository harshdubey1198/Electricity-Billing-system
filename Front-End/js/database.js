// database.js
import { getDatabase, ref, set, get } from 'firebase/database';
import app from './firebaseConfig';  // Import Firebase config

const db = getDatabase(app);  // Initialize the Database

// Save data function
export const saveData = (userId, billAmount) => {
  const billRef = ref(db, 'bills/' + userId);
  set(billRef, {
    billAmount: billAmount,
    date: new Date().toISOString()
  }).then(() => {
    console.log('Bill data saved successfully!');
  }).catch((error) => {
    console.error('Error saving bill data:', error.message);
  });
};

// Read data function
export const readData = (userId) => {
  const billRef = ref(db, 'bills/' + userId);
  get(billRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log('Bill data:', snapshot.val());  // Log the bill data
      } else {
        console.log('No bill data available');
      }
    })
    .catch((error) => {
      console.error('Error reading bill data:', error.message);
    });
};

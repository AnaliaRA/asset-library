import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Debug: Check if environment variables are loaded
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.error('Firebase API Key is missing');
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Debug: Log config structure (without sensitive values)
console.log('Firebase config keys:', Object.keys(firebaseConfig));
console.log('Are all config values present?', Object.values(firebaseConfig).every(Boolean));

// Initialize Firebase only if all config values are present
if (!Object.values(firebaseConfig).every(Boolean)) {
  console.error('Missing Firebase configuration. Please check your environment variables.');
  console.log('Available config keys:', Object.keys(firebaseConfig));
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
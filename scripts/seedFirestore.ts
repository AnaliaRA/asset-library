import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleAssets = [
  {
    name: 'Monthly Sales KPI Dashboard',
    type: 'kpi',
    description: 'Comprehensive dashboard showing monthly sales performance metrics',
    creationDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    businessQuestions: [
      'What is the monthly sales trend?',
      'How do sales compare to targets?'
    ],
    amountOfPages: 5,
    hasVisuals: true,
    hits: 42
  },
  {
    name: 'Customer Satisfaction Report',
    type: 'dataviz',
    description: 'Visual representation of customer satisfaction metrics',
    creationDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    businessQuestions: [
      'What is the overall satisfaction score?',
      'Which areas need improvement?'
    ],
    amountOfPages: 3,
    hasVisuals: true,
    hits: 28
  },
  {
    name: 'Product Performance Layout',
    type: 'layout',
    description: 'Standard layout for product performance reports',
    creationDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    businessQuestions: [],
    amountOfPages: 2,
    hasVisuals: false,
    hits: 15
  }
].map(asset => ({
  ...asset,
  // Ensure numbers are actual numbers, not strings
  amountOfPages: Number(asset.amountOfPages),
  hits: Number(asset.hits),
  // Ensure booleans are actual booleans
  hasVisuals: Boolean(asset.hasVisuals),
  // Ensure arrays are actual arrays
  businessQuestions: Array.isArray(asset.businessQuestions) ? asset.businessQuestions : []
}));

async function seedFirestore() {
  try {
    const assetsCollection = collection(db, 'assets');
    
    for (const asset of sampleAssets) {
      const docRef = await addDoc(assetsCollection, asset);
      console.log(`Added asset: ${asset.name} with ID: ${docRef.id}`);
    }
    
    console.log('Successfully seeded Firestore with sample assets!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Firestore:', error);
    process.exit(1);
  }
}

// Run the seed function
seedFirestore(); 
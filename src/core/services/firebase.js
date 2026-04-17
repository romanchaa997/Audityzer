const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');
const { getStorage } = require('firebase/storage');
const fs = require('fs-extra');
const path = require('path');

// Check for environment variables first
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Fallback to local config file if it exists
try {
  const configPath = path.join(process.cwd(), '.firebase-config.json');
  if (fs.existsSync(configPath)) {
    const localConfig = fs.readJSONSync(configPath);
    Object.keys(firebaseConfig).forEach(key => {
      if (!firebaseConfig[key] && localConfig[key]) {
        firebaseConfig[key] = localConfig[key];
      }
    });
  }
} catch (err) {
  console.warn('Could not load local Firebase configuration file');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

module.exports = { app, db, auth, storage };

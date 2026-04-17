/**
 * Firebase service stub for Audityzer
 * Full Firebase integration requires FIREBASE_* environment variables
 * and the firebase npm package to be installed.
 */

let app = null;
let db = null;
let auth = null;
let storage = null;

try {
  // Only attempt to load Firebase if the package is available
  const firebase = require('firebase/app');
  const firestore = require('firebase/firestore');
  const firebaseAuth = require('firebase/auth');
  const firebaseStorage = require('firebase/storage');

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  if (firebaseConfig.apiKey) {
    app = firebase.initializeApp(firebaseConfig);
    db = firestore.getFirestore(app);
    auth = firebaseAuth.getAuth(app);
    storage = firebaseStorage.getStorage(app);
    console.log('Firebase initialized successfully');
  } else {
    console.warn('Firebase not configured: FIREBASE_API_KEY environment variable not set. Running without Firebase.');
  }
} catch (err) {
  console.warn('Firebase package not available. Running without Firebase integration:', err.message);
}

module.exports = { app, db, auth, storage };

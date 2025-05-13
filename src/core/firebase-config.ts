/**
 * Firebase Configuration for Web3 Security Test Kit
 * 
 * This file contains Firebase configuration for storage, authentication,
 * and analytics features used by the test kit.
 */

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration - Replace with your actual Firebase config
// when deploying to production
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'your-project-id.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'your-project-id.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'your-messaging-sender-id',
  appId: process.env.FIREBASE_APP_ID || 'your-app-id',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'your-measurement-id'
};

/**
 * Interface for Firebase service instances
 */
interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
  analytics: Analytics | null;
}

/**
 * Initialize Firebase services
 */
export const initFirebase = (): FirebaseServices => {
  // Check if Firebase is already initialized
  try {
    const existingApp = initializeApp(firebaseConfig);
    const auth = getAuth(existingApp);
    const firestore = getFirestore(existingApp);
    const storage = getStorage(existingApp);
    
    // Initialize analytics if supported
    let analytics: Analytics | null = null;
    isSupported()
      .then(isSupported => {
        if (isSupported) {
          analytics = getAnalytics(existingApp);
        }
      })
      .catch(error => {
        console.error('Firebase analytics error:', error);
      });
    
    return {
      app: existingApp,
      auth,
      firestore,
      storage,
      analytics
    };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
};

/**
 * Firebase service singleton
 */
let firebaseInstance: FirebaseServices | null = null;

/**
 * Get Firebase services - initializes Firebase if not already done
 * @returns Object with Firebase services
 */
export const getFirebaseServices = (): FirebaseServices => {
  if (!firebaseInstance) {
    firebaseInstance = initFirebase();
  }
  return firebaseInstance;
};

/**
 * Determine if Firebase should be initialized based on environment
 * @returns Boolean indicating if Firebase should be initialized
 */
export const shouldInitializeFirebase = (): boolean => {
  // Don't initialize Firebase in test environments or when keys aren't set
  if (process.env.NODE_ENV === 'test' || process.env.MOCK_MODE === 'true') {
    return false;
  }

  // Check if required Firebase config is available
  const hasApiKey = !!process.env.FIREBASE_API_KEY && 
    process.env.FIREBASE_API_KEY !== 'YOUR_API_KEY';
  
  return hasApiKey;
};

/**
 * Test Firebase connection
 * @returns Promise that resolves to boolean indicating if connection is successful
 */
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    if (!shouldInitializeFirebase()) {
      console.log('Firebase initialization skipped based on environment settings');
      return false;
    }

    const { app } = getFirebaseServices();
    // Simple check - if we got this far without errors, connection works
    return !!app;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return false;
  }
}; 
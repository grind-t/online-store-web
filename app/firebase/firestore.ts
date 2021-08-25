import { initializeDefaultApp } from './app';
import { getApps } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

function getAppFirestore(): Firestore {
  if (!getApps().length) initializeDefaultApp();
  if (process.env.NODE_ENV === 'development') {
    // To tree shake properly.
    const { connectFirestoreEmulator } = require('firebase/firestore');
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
  }
  return getFirestore();
}

export * from 'firebase/firestore';
export { getAppFirestore };

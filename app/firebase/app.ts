import config from './config';
import { isClient } from 'app/env';
import { getAnalytics } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';

const warning =
  'An attempt was made to create a default firebase app, although there were already initialized apps.';

export function initializeDefaultApp() {
  if (getApps().length) {
    console.warn(warning);
    return;
  }
  initializeApp(config);
  if (isClient) {
    getAnalytics();
    getPerformance();
  }
  if (process.env.NODE_ENV === 'development') {
    const { getAuth, connectAuthEmulator } = require('firebase/auth');
    const {
      getFirestore,
      connectFirestoreEmulator,
    } = require('firebase/firestore');
    connectAuthEmulator(getAuth(), 'http://localhost:9099');
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
  }
}

export * from 'firebase/app';

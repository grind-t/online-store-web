import { initializeDefaultApp } from './app';
import { getApps } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

function getAppAuth(): Auth {
  if (!getApps().length) initializeDefaultApp();
  if (process.env.NODE_ENV === 'development') {
    // To tree shake properly.
    const { connectAuthEmulator } = require('firebase/auth');
    connectAuthEmulator(getAuth(), 'http://localhost:9099');
  }
  return getAuth();
}

export * from 'firebase/auth';
export { getAppAuth };

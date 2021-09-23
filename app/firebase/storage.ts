import { initializeDefaultApp } from './app';
import { getApps } from 'firebase/app';
import { getStorage, FirebaseStorage } from 'firebase/storage';

export function getAppStorage(): FirebaseStorage {
  if (!getApps().length) initializeDefaultApp();
  return getStorage();
}

export * from 'firebase/storage';

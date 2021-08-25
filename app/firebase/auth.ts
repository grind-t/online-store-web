import { initializeDefaultApp } from './app';
import { getApps } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

export function getAppAuth(): Auth {
  if (!getApps().length) initializeDefaultApp();
  return getAuth();
}

export * from 'firebase/auth';

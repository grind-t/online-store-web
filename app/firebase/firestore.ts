import { initializeDefaultApp } from './app';
import { getApps } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

export const path = Object.freeze({
  products: 'products',
  carts: 'carts',
});

export function getAppFirestore(): Firestore {
  if (!getApps().length) initializeDefaultApp();
  return getFirestore();
}

export * from 'firebase/firestore';

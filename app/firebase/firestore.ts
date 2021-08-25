import { initializeDefaultApp } from './app';
import { getApps } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

export const path = Object.freeze({
  products: 'products',
  variants: 'variants',
  customers: 'customers',
  cart: 'cart',
});

export function getAppFirestore(): Firestore {
  if (!getApps().length) initializeDefaultApp();
  return getFirestore();
}

export * from 'firebase/firestore';

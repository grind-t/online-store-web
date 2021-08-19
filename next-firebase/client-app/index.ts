import { getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import firebaseConfig from './config';

function initializeClientApp() {
  if (getApps().length) return;
  initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    getAnalytics();
    getPerformance();
  }
}

export { initializeClientApp };

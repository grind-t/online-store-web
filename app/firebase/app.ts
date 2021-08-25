import config from './config';
import { isClient } from 'app/env';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';

function initializeDefaultApp() {
  initializeApp(config);
  if (isClient) {
    getAnalytics();
    getPerformance();
  }
}

export * from 'firebase/app';
export { initializeDefaultApp };

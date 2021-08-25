import config from '../config';
import { isClient } from 'app/env';
import 'firebase/compat/analytics';
import firebase from 'firebase/compat/app';
import 'firebase/compat/performance';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  if (isClient) {
    firebase.analytics();
    firebase.performance();
    //@ts-ignore firebaseui need it.
    window.firebase = firebase;
  }
}

export default firebase;

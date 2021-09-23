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
  if (process.env.NODE_ENV === 'development') {
    require('firebase/compat/auth');
    require('firebase/compat/firestore');
    require('firebase/compat/storage');
    firebase.auth().useEmulator('http://localhost:9099');
    firebase.firestore().useEmulator('localhost', 8080);
    firebase.storage().useEmulator('localhost', 9199);
  }
}

export default firebase;

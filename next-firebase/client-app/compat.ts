import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/performance';
import firebaseConfig from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    firebase.analytics();
    firebase.performance();
    //@ts-ignore firebaseui need it.
    window.firebase = firebase;
  }
}

export default firebase;

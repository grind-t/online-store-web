import firebase from './app';
import 'firebase/compat/firestore';

if (process.env.NODE_ENV === 'development') {
  firebase.firestore().useEmulator('localhost', 8080);
}

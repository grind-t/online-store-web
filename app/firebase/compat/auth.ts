import firebase from './app';
import 'firebase/compat/auth';

if (process.env.NODE_ENV === 'development') {
  firebase.auth().useEmulator('http://localhost:9099');
}

import { getAppAuth, onAuthStateChanged, Unsubscribe } from 'app/firebase/auth';

export interface User {
  id: string;
  email: string;
}

export type UserChangedCallback = (user: User | null) => void;

export function onUserChange(cb: UserChangedCallback): Unsubscribe {
  return onAuthStateChanged(getAppAuth(), (firestoreUser) => {
    const user = firestoreUser && {
      id: firestoreUser.uid,
      email: firestoreUser.email,
    };
    cb(user);
  });
}

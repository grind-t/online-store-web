import { isClient } from 'app/env';
import { getAppAuth, onAuthStateChanged } from 'app/firebase/auth';
import { atom } from 'recoil';

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export const authState = atom<User | null>({
  key: 'aut',
  default: null,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      if (!isClient) return;
      return onAuthStateChanged(getAppAuth(), (user) => {
        if (!user) setSelf(null);
        else
          setSelf({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          });
      });
    },
  ],
});

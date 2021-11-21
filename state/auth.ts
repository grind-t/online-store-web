import { isClient } from 'app/env';
import { User, onAuthStateChanged, getAppAuth } from 'app/firebase/auth';
import { atom } from 'recoil';

export const authState = atom<User | null>({
  key: 'auth',
  default: null,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      if (!isClient) return;
      return onAuthStateChanged(getAppAuth(), (user) => setSelf(user));
    },
  ],
});

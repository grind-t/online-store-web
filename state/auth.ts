import { onAuthStateChanged } from 'api/auth';
import { isClient } from 'app/env';
import { Nullish } from 'lib/utils';
import { atom } from 'recoil';

export interface User {
  uid: string;
  email?: string;
}

export const authState = atom<User | Nullish>({
  key: 'auth',
  default: null,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      if (!isClient) return;
      return onAuthStateChanged(setSelf);
    },
  ],
});

import { onAuthStateChanged, User } from 'lib/auth';
import { cartKey } from 'lib/hooks/cart';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSWRConfig } from 'swr';

const AuthContext = createContext<User | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const { mutate } = useSWRConfig();
  useEffect(
    () =>
      onAuthStateChanged((user) => {
        setUser(user);
        mutate(cartKey);
      }),
    [mutate]
  );
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

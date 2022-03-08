import { getUser, onAuthStateChanged, User } from 'lib/auth';
import { cartKey } from 'lib/hooks/cart';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSWRConfig } from 'swr';

export interface Auth {
  user?: User;
  isUserLoading?: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<Auth>({});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>({ isUserLoading: true });
  const { mutate } = useSWRConfig();
  useEffect(() => {
    // Set user in effect to avoid hydratation error.
    setAuth({ user: getUser() });
    return onAuthStateChanged((user) => {
      setAuth({ user });
      mutate(cartKey);
    });
  }, [mutate]);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

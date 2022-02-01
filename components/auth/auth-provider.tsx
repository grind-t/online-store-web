import { getUser, onAuthStateChanged, User } from 'lib/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext<User | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(getUser());
  useEffect(() => onAuthStateChanged(setUser), []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

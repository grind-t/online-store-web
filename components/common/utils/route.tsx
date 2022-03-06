import { useAuth } from 'components/auth/auth-provider';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface RouteProps {
  isProtected?: boolean;
  children: ReactNode;
}

const Route = ({ isProtected, children }: RouteProps) => {
  const user = useAuth();
  const router = useRouter();
  const isSignInRedirect = isProtected && !user;
  useEffect(() => {
    if (isSignInRedirect) router.replace('/auth#sign-in');
  }, [router, isSignInRedirect]);
  if (isSignInRedirect) return null;
  return <>{children}</>;
};

export default Route;
export type { RouteProps };

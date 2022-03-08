import { useAuth } from 'components/auth/auth-provider';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface RouteProps {
  isProtected?: boolean;
  children: ReactNode;
}

const Route = ({ isProtected, children }: RouteProps) => {
  const { user, isUserLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isProtected && !isUserLoading && !user) {
      router.replace('/auth#sign-in');
    }
  }, [router, isProtected, user, isUserLoading]);
  if (!isProtected || user) return <>{children}</>;
  return null;
};

export default Route;
export type { RouteProps };

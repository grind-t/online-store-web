import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from 'app/supabase-client';
import { Nullish } from 'lib/utils';

export interface User {
  uid: string;
  email?: string;
}

export type AuthStateChangedCallback = (user: User | Nullish) => void;

export type Unsubscribe = () => void;

export function getUser(): User | Nullish {
  const user = supabase.auth.user();
  return user && { uid: user.id, email: user.email };
}

export function onAuthStateChanged(cb: AuthStateChangedCallback): Unsubscribe {
  const handleChange = (user: SupabaseUser | Nullish) =>
    cb(user && { uid: user.id, email: user.email });
  setTimeout(() => handleChange(supabase.auth.user()), 100);
  return (
    supabase.auth.onAuthStateChange((_event, session) =>
      handleChange(session?.user)
    ).data?.unsubscribe || (() => {})
  );
}

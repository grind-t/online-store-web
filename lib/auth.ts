import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { Nullish, noop } from 'lib/utils';

export interface User {
  id: string;
  email?: string;
}

export type AuthStateChangedCallback = (user?: User) => void;

export type Unsubscribe = () => void;

function fromSB(user: SupabaseUser | Nullish): User | undefined {
  return user ? { id: user.id, email: user.email } : undefined;
}

export function getUser(): User | undefined {
  return fromSB(supabase.auth.user());
}

export function onAuthStateChanged(cb: AuthStateChangedCallback): Unsubscribe {
  cb(getUser());
  return (
    supabase.auth.onAuthStateChange((_event, session) =>
      cb(fromSB(session?.user))
    ).data?.unsubscribe || noop
  );
}

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signIn({ email, password });
  if (error) throw new Error(error.message);
}

export async function signUp(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

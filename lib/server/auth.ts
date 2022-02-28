import { admin } from './supabase';
import { User } from '@supabase/supabase-js';
import { ProblemDetails } from 'lib/problem-details';

export const tokenProblem = new ProblemDetails({
  status: 400,
  detail: 'Invalid supabase token',
});

export async function getUser(token: string): Promise<User> {
  const { user, error } = await admin.auth.api.getUser(token);
  if (error) {
    throw new ProblemDetails({ status: error.status, detail: error.message });
  }
  if (!user) {
    throw tokenProblem;
  }
  return user;
}

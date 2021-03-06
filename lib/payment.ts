import { ProblemDetails } from 'lib/problem-details';
import { supabase } from 'lib/supabase';

export interface Payment {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled';
  paid: boolean;
}

export interface PendingPayment extends Payment {
  status: 'pending';
  confirmation: {
    type: 'redirect';
    confirmation_url: string;
  };
}

const apiUrl = () => `${location.origin}/api/payment`;

export async function getPayment(id: string): Promise<Payment> {
  const session = supabase.auth.session();
  const response = await fetch(`${apiUrl()}/${id}`, {
    headers: {
      'X-Supabase-Auth': session ? session.access_token : '',
    },
  });
  const body = await response.json();
  if (!response.ok) throw new ProblemDetails(body);
  return body;
}

export async function createPayment(orderId: number): Promise<PendingPayment> {
  const session = supabase.auth.session();
  const response = await fetch(apiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Supabase-Auth': session ? session.access_token : '',
    },
    body: JSON.stringify({ orderId }),
  });
  const body = await response.json();
  if (!response.ok) throw new ProblemDetails(body);
  return body;
}

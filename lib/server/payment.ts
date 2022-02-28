import { User } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { toSnapshot, toUnit } from 'dinero.js';
import { Order, getTotalPrice } from 'lib/orders';
import { ProblemDetails } from 'lib/problem-details';

export interface Payment {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled';
  paid: boolean;
  metadata: {
    order_id: number;
    user_id: string;
  };
}

export interface PendingPayment extends Payment {
  status: 'pending';
  confirmation: {
    type: 'redirect';
    confirmation_url: string;
  };
}

export interface PaymentError {
  type: string;
  id: string;
  code: string;
  description: string;
  parameter: string;
}

const apiUrl = 'https://api.yookassa.ru/v3/payments';
const shopId = process.env.YOOKASSA_SHOP_ID;
const key = process.env.YOOKASSA_SECRET_KEY;
const credentials = Buffer.from(`${shopId}:${key}`).toString('base64');
const authorizationHeader = `Basic ${credentials}`;

export async function getPayment(id: string): Promise<Payment> {
  const response = await fetch(`${apiUrl}/${id}`, {
    headers: { Authorization: authorizationHeader },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new ProblemDetails({
      status: response.status,
      detail: body.description,
    });
  }
  return {
    id: body.id,
    status: body.status,
    paid: body.paid,
    metadata: body.metadata,
  };
}

export async function postPayment(
  order: Order,
  user: User,
  returnUrl: string
): Promise<PendingPayment> {
  const price = getTotalPrice(order.items);
  const { currency, scale } = toSnapshot(price);
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: authorizationHeader,
      'Idempotence-Key': randomUUID(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: {
        value: toUnit(price).toFixed(scale),
        currency: currency.code,
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: returnUrl,
      },
      metadata: {
        order_id: order.id,
        user_id: user.id,
      },
    }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new ProblemDetails({
      status: response.status,
      detail: body.description,
    });
  }
  return {
    id: body.id,
    status: body.status,
    paid: body.paid,
    confirmation: body.confirmation,
    metadata: body.metadata,
  };
}

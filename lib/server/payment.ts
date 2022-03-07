import { admin } from './supabase';
import { User } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { toSnapshot, toUnit } from 'dinero.js';
import { Order, getTotalPrice } from 'lib/orders';
import { ProblemDetails } from 'lib/problem-details';
import { env } from 'process';

export interface YookassaPayment {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled';
  paid: boolean;
  metadata: {
    order_id: number;
    user_id: string;
    secret: string;
  };
}

export interface YookassaPendingPayment extends YookassaPayment {
  status: 'pending';
  confirmation: {
    type: 'redirect';
    confirmation_url: string;
  };
}

export interface YookassaNotification {
  event:
    | 'payment.waiting_for_capture'
    | 'payment.succeeded'
    | 'payment.canceled'
    | 'refund.succeeded';
  object: YookassaPayment;
}

export interface YookassaPaymentError {
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

export async function getPayment(id: string): Promise<YookassaPayment> {
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
  return body;
}

export async function postPayment(
  order: Order,
  user: User,
  returnUrl: string
): Promise<YookassaPendingPayment> {
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
        secret: env.PAYMENT_SECRET,
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
  return body;
}

export async function paymentSucceeded(orderId: number) {
  const { status, error } = await admin.rpc('payment_succeeded', {
    order_id_input: orderId,
  });
  if (error) throw new ProblemDetails({ status, detail: error.message });
}

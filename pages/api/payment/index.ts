import { StatusCodes } from 'http-status-codes';
import { PendingPayment } from 'lib/payment';
import { ProblemDetails } from 'lib/problem-details';
import { getUser } from 'lib/server/auth';
import { handleError } from 'lib/server/middleware';
import { getOrder, updateOrder } from 'lib/server/orders';
import {
  getPayment,
  paymentSucceeded,
  postPayment,
  YookassaNotification,
} from 'lib/server/payment';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { env } from 'process';

const paymenStatusProblem = new ProblemDetails({
  status: StatusCodes.FORBIDDEN,
  detail: 'Payment already in succeeded status',
});

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: env.MAIL_LOGIN,
    pass: env.MAIL_PASSWORD,
  },
});

async function handleNotification(req: NextApiRequest, res: NextApiResponse) {
  const { event, object: payment }: YookassaNotification = req.body;
  if (event !== 'payment.succeeded') return res.status(StatusCodes.OK).json({});
  const { order_id, secret } = payment.metadata;
  if (secret !== env.PAYMENT_SECRET)
    throw new ProblemDetails({ status: StatusCodes.FORBIDDEN });
  const order = await getOrder(order_id);
  await transporter.sendMail({
    from: env.MAIL_ADDRESS, // sender address
    to: order.recipientEmail, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
  await paymentSucceeded(order_id);
  res.status(StatusCodes.OK).json({});
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<PendingPayment | ProblemDetails>
) {
  const { headers, body } = req;
  const token = headers['x-supabase-auth'] as string;
  const orderId = body.orderId as number;
  const host = headers['host'] || 'marketolon.netlify.app';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const returnUrl = `${protocol}://${host}/orders`;
  const user = await getUser(token);
  const order = await getOrder(orderId);
  if (order.paymentId) {
    const payment = await getPayment(order.paymentId);
    if (payment.status === 'succeeded') throw paymenStatusProblem;
  }
  const payment = await postPayment(order, user, returnUrl);
  await updateOrder({ id: order.id, payment_id: payment.id });
  res.setHeader('Location', `/${payment.id}`);
  res.status(StatusCodes.CREATED).json({
    id: payment.id,
    status: payment.status,
    paid: payment.paid,
    confirmation: payment.confirmation,
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  if (body?.type === 'notification') await handleNotification(req, res);
  else if (method === 'POST') await handlePost(req, res);
  else {
    res.setHeader('Allow', ['POST']);
    throw new ProblemDetails({ status: StatusCodes.METHOD_NOT_ALLOWED });
  }
}

export default handleError(handler);

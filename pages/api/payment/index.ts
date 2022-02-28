import { StatusCodes } from 'http-status-codes';
import { ProblemDetails } from 'lib/problem-details';
import { getUser } from 'lib/server/auth';
import { handleError } from 'lib/server/middleware';
import { getOrder, updateOrder } from 'lib/server/orders';
import { getPayment, postPayment, PendingPayment } from 'lib/server/payment';
import { NextApiRequest, NextApiResponse } from 'next';

const returnUrl = 'https://marketolon.netlify.app/';

const paymenStatusProblem = new ProblemDetails({
  status: StatusCodes.FORBIDDEN,
  detail: 'Payment already in succeeded status',
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PendingPayment | ProblemDetails>
) {
  if (req.method === 'POST') {
    const token = req.headers['x-supabase-auth'] as string;
    const orderId = req.body.orderId as number;
    const user = await getUser(token);
    const order = await getOrder(orderId);
    if (order.paymentId) {
      const payment = await getPayment(order.paymentId);
      if (payment.status === 'succeeded') throw paymenStatusProblem;
    }
    const payment = await postPayment(order, user, returnUrl);
    await updateOrder({ id: order.id, payment_id: payment.id });
    res.setHeader('Location', `/${payment.id}`);
    res.status(StatusCodes.CREATED).json(payment);
  } else {
    res.setHeader('Allow', ['POST']);
    throw new ProblemDetails({ status: StatusCodes.METHOD_NOT_ALLOWED });
  }
}

export default handleError(handler);

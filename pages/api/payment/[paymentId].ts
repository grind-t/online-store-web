import { StatusCodes } from 'http-status-codes';
import { Payment } from 'lib/payment';
import { ProblemDetails } from 'lib/problem-details';
import { getUser } from 'lib/server/auth';
import { handleError } from 'lib/server/middleware';
import { getPayment } from 'lib/server/payment';
import { NextApiRequest, NextApiResponse } from 'next';

const authProblem = new ProblemDetails({ status: StatusCodes.FORBIDDEN });

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Payment | ProblemDetails>
) {
  const { method, query } = req;
  const token = req.headers['x-supabase-auth'] as string;
  const paymentId = query.paymentId as string;
  if (method === 'GET') {
    const user = await getUser(token);
    const payment = await getPayment(paymentId);
    if (user.id !== payment.metadata.user_id) throw authProblem;
    res.status(StatusCodes.OK).json({
      id: payment.id,
      status: payment.status,
      paid: payment.paid,
    });
  } else {
    res.setHeader('Allow', ['GET']);
    throw new ProblemDetails({ status: StatusCodes.METHOD_NOT_ALLOWED });
  }
}

export default handleError(handler);

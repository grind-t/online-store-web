import { StatusCodes } from 'http-status-codes';
import { ProblemDetails } from 'lib/problem-details';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export const handleError =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (e) {
      if (e instanceof ProblemDetails) return res.status(e.status).json(e);
      const status = StatusCodes.INTERNAL_SERVER_ERROR;
      const problem =
        e instanceof Error
          ? new ProblemDetails({ status, detail: e.message })
          : typeof e === 'string'
          ? new ProblemDetails({ status, detail: e })
          : new ProblemDetails({ status });
      res.status(status).json(problem);
    }
  };

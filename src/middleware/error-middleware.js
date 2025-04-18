import ResponseError from '../utils/response-error.js';
import { logError, logWarn } from '../utils/log-util.js';

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    logWarn(req, err)

    res.status(err.status).json({
      error: true,
      message: err.message,
    });
  } else {
    const requestId = logError(req, err);

    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
      requestId,
    });
  }
};

export default errorMiddleware;
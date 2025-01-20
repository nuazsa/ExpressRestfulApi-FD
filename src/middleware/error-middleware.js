import { v4 as uuidv4 } from 'uuid';
import ResponseError from '../utils/response-error.js';
import logger from '../utils/logging.js';

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  const requestId = uuidv4();

  if (err instanceof ResponseError) {
    logger.warn({
      requestId,
      message: err.message,
      status: err.status,
      method: req.method,
      url: req.originalUrl,
    });

    res.status(err.status).json({
      error: true,
      message: err.message,
    });
  } else {
    logger.error({
      requestId,
      message: err.message || 'Unknown error occurred',
      stack: err.stack,
      status: err.status || 500,
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      headers: req.headers,
    });

    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
      requestId,
    });
  }
};

export default errorMiddleware;
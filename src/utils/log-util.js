import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger.js'; 

const logInfo = (message) => {
  logger.info({
    message
  })
}

const logWarn = (req, err) => {
  logger.warn({
    message: err.message,
    status: err.status || 500,
    method: req.method || null,
    url: req.originalUrl || null,
  });
};

const logError = (req, err) => {

  const requestId = uuidv4();

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

  return requestId;
};

export {
  logInfo,
  logWarn,
  logError
}
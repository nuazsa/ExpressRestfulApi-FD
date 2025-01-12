import jwt from 'jsonwebtoken';
import ResponseError from '../utils/response-error.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new ResponseError(401, "Access token required");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) throw new ResponseError(403, "Invalid or expired token");

    req.user = user;
    next();
  });
};

export default authenticateToken;

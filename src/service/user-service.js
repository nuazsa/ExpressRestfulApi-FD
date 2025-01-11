import dbPool from '../config/database.js';
import bcryptjs from 'bcryptjs';
import ResponseError from '../utils/response-error.js';

const register = async (name, email, password) => {
  try {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const passwordHash = await bcryptjs.hash(password, 10)

    const [result] = await dbPool.execute(query, [name, email, passwordHash]);

    return result;   
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      throw new ResponseError(409, "Email already in use");
    }
  }
}

const login = async (email, password) => {
  const query = 'SELECT user_id, name, password FROM users WHERE email = ? LIMIT 1';
  const [result] = await dbPool.execute(query, [email]);

  if (!result.length) {
    throw new ResponseError(401, "Invalid email or password");
  }

  const user = result[0];
  const passwordMatch = await bcryptjs.compare(password, user.password);

  if (!passwordMatch) {
    throw new ResponseError(401, "Invalid email or password");
  }

  return user;
}

export default {
  register,
  login
}
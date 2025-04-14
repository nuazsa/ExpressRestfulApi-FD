import bcryptjs from 'bcryptjs';
import ResponseError from '../utils/response-error.js';
import {validate} from '../validation/validation.js';
import {registerUserValidation, loginUserValidation} from '../validation/user-validation.js';
import User from '../models/User.js';

const register = async (request) => {
  try {
    const {name, email, password} = validate(registerUserValidation, request);

    const existing = await User.findOne({where: {email}});
    if (existing) throw new ResponseError(409, "\"Invalid\" email already in use");

    const passwordHash = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: passwordHash
    });
    
    return user;
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") throw new ResponseError(409, "\"Invalid\" email already in use");
    throw (e);
  }
}

const login = async (request) => {
  try {
    const {email, password} = validate(loginUserValidation, request);

    const user = await User.findOne({
      where: {email},
      attributes: ['user_id', 'name', 'password']
    });
  
    if (!user) throw new ResponseError(401, "\"Invalid\" email or password");

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) throw new ResponseError(401, "\"Invalid\" email or password");
  
    return user;
  } catch (e) {
    throw (e);
  }
}

export default {
  register,
  login
}
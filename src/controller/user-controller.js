import userService from '../service/user-service.js';
import jwt from 'jsonwebtoken';
import ResponseError from '../utils/response-error.js';

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new ResponseError(400, "Missing required fields: name, email, or password");
    if (password.length < 8) throw new ResponseError(400, "Password must be at least 8 characters");
    
    await userService.register(name, email, password);

    res.status(201).json({
      error: false,
      message: "User created"
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new ResponseError(400, "Missing required fields: email or password");

    const user = await userService.login(email, password);
    
      const token = jwt.sign({ 
        id: user.user_id, 
        name: user.name,
      }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      error: false,
      message: "Success",
      loginResult: {
        userId: user.user_id,
        name: user.name,
        token: token
      },
    });
  } catch (e) {
    next(e);
  }
}

export default {
  register,
  login,
};
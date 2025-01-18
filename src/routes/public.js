import express from 'express';
import healthController from '../controller/health-controller.js';
import userController from '../controller/user-controller.js';

const publicRouter = new express.Router();

publicRouter.get('/up', healthController.ping);
publicRouter.post('/register', userController.register);
publicRouter.post('/login', userController.login);

export {
  publicRouter
}
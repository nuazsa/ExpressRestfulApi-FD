import express from 'express';
import healthController from '../controller/health-controller.js';
import userController from '../controller/user-controller.js';

const publicRouter = new express.Router();

publicRouter.get('/', healthController.ping);
publicRouter.post('/api/register', userController.register);
publicRouter.post('/api/login', userController.login);

export {
  publicRouter
}
import express from 'express';
import storiesController from '../controller/stories-controller.js';
import authenticateToken from '../middleware/auth-middleware.js';

const apiRouter = new express.Router();
apiRouter.use(authenticateToken);

apiRouter.post('/stories', storiesController.create);
apiRouter.get('/stories', storiesController.getAll);
apiRouter.get('/stories/:id', storiesController.getById);

export {
  apiRouter
}
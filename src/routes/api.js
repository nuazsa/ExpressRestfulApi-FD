import express from 'express';
import storiesController from '../controller/stories-controller.js';
import authenticateToken from '../middleware/auth-middleware.js';

const apiRouter = new express.Router();
apiRouter.use(authenticateToken);

apiRouter.post('/api/stories', storiesController.create);
apiRouter.get('/api/stories', storiesController.getAll);
apiRouter.get('/api/stories/:id', storiesController.getById);

export {
  apiRouter
}
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { publicRouter } from './routes/public.js';
import { apiRouter } from './routes/api.js';
import errorMiddleware from './middleware/error-middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', publicRouter);
app.use('/api', apiRouter)

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app; 
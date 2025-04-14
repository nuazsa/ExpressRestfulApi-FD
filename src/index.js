import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { publicRouter } from './routes/public.js';
import { apiRouter } from './routes/api.js';
import errorMiddleware from './middleware/error-middleware.js';
import sequelize from './config/database.js';

dotenv.config();

try {
  await sequelize.sync();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

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
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

let client = null;

const isRedisEnabled = process.env.R_HOST && process.env.R_PORT;

if (isRedisEnabled) {
  client = createClient({
    username: process.env.R_USER,
    password: process.env.R_PASSWORD,
    socket: {
      host: process.env.R_HOST,
      port: process.env.R_PORT
    }
  });

  client.on('error', err => console.warn('Redis Client Error:', err.message));
  
  try {
    await client.connect();
    console.log(`Redis connected`);
  } catch (error) {
    console.error(`Redis Connection Failed: ${error.message}`);
  }
}

export default client;
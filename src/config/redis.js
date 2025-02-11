import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config()

const client = createClient({
  username: process.env.R_USER,
  password: process.env.R_PASSWORD,
  socket: {
      host: process.env.R_HOST,
      port: process.env.R_PORT
  }
});

client.on('error', err => console.log('Redis Client Error', err));

try {
  await client.connect();
  console.log(`Redis connected`);
} catch (error) {
  console.error(`Redis Connection Failed: ${error.message}`);
}

export default client;
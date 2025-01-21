import request from 'supertest';
import app from '../src/index.js';
import { removeUser, closeDatabaseConnection } from './test-util.js';

describe('POST /api/register', () => {

  afterEach(async () => {
    await removeUser();
  });

  afterAll(async () => {
    await closeDatabaseConnection();
  });

  test('should can create new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: 'test',
        email: 'test@gmail.com',
        password: '12345678'
      });

    expect(response.status).toEqual(201);
    expect(response.body.message).toBe('User created')
  });
});
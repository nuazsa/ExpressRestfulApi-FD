import request from 'supertest';
import app from '../src/index.js';

describe('Health Test', () => {
  test('should can get some message and must be 200 response status', async () => {
    const response = await request(app)
      .get('/api/up')

    expect(response.status).toEqual(200);
    expect(response.body.message).toBeDefined();
  });
});
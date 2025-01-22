import request from 'supertest';
import app from '../src/index.js';
import { removeUser, closeDatabaseConnection, createUser } from './test-util.js';

afterEach(async () => {
  await removeUser();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

describe('POST /api/register', () => {
  test('should can create new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: 'test',
        email: 'test@gmail.com',
        password: '12345678'
      });

    expect(response.status).toEqual(201);
    expect(response.body.message).toBe('User created');
  });

  test('should reject if request is invalid', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: '',
        email: '',
        password: ''
      });
    
    expect(response.status).toEqual(400);
    expect(response.body.error).toBeTruthy();
  });

  test('should reject if already used', async () => {
    let response = await request(app)
      .post('/api/register')
      .send({
        name: 'test',
        email: 'test@gmail.com',
        password: '12345678'
      });

    expect(response.status).toEqual(201);
    expect(response.body.message).toBe('User created');

    response = await request(app)
      .post('/api/register')
      .send({
        name: 'test',
        email: 'test@gmail.com',
        password: '12345678'
      });
    
    expect(response.status).toEqual(409);
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST /api/login', () => {
  beforeEach(async () => {
    await createUser();
  });  

  test('should can login', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '12345678'
      })

    expect(response.status).toEqual(200);
    expect(response.body.data.token).toBeDefined();
  });

  test('should rejected if request is invalid', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: 'not12345678'
      })
    
    expect(response.status).toEqual(401);
    expect(response.body.error).toBeTruthy();
  });

  test('should rejected if email is wrong', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'wrong@gmail.com',
        password: 'not12345678'
      })
    
    expect(response.status).toEqual(401);
    expect(response.body.error).toBeTruthy();
  });
});

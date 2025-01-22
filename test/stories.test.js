import request from "supertest";
import app from '../src/index.js';
import { createUser, removeUser, closeDatabaseConnection, removeStories } from "./test-util";

beforeEach(async () => {
  await createUser();
});

afterEach(async () => {
  await removeUser();
});

afterAll(async () => {
  await closeDatabaseConnection();
});


describe('POST /api/stories', () => {
  afterEach(async () => {
    await removeStories();
  });
  
  test('should can create new stories', async () => {
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '12345678'
      });

    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = `Bearer ${loginResponse.body.data.token}`;

    const storiesResponse = await request(app)
      .post('/api/stories')
      .set('Authorization', token)
      .send({
        description: "test"
      })

    expect(storiesResponse.status).toEqual(201);
    expect(storiesResponse.error).toBeFalsy();
  });

  test('should rejected if invalid description of stories', async () => {
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '12345678'
      });

    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = `Bearer ${loginResponse.body.data.token}`;

    const storiesResponse = await request(app)
      .post('/api/stories')
      .set('Authorization', token)
      .send({
        description: ""
      })

    expect(storiesResponse.status).toEqual(400);
    expect(storiesResponse.body.error).toBeTruthy();
  });
});

describe('GET /api/stories', () => {
  test('should get all stories', async () => {
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '12345678'
      });

    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = `Bearer ${loginResponse.body.data.token}`;

    const storiesResponse = await request(app)
      .get('/api/stories')
      .set('Authorization', token);

    expect(storiesResponse.status).toEqual(200);
    expect(storiesResponse.body.data).toBeDefined();
  });

  test('should rejected if invalid token', async () => {
    
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '12345678'
      });

    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = `Bearer `;

    const storiesResponse = await request(app)
      .get('/api/stories')
      .set('Authorization', token);

    expect(storiesResponse.status).toEqual(401);
    expect(storiesResponse.body.data).toBeUndefined();
  });
});

describe('GET /api/stories/:id', () => {
  test('should get detail stories', async () => {
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'test@gmail.com',
        password: '12345678'
      });

    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = `Bearer ${loginResponse.body.data.token}`;
    
    const createResponse = await request(app)
      .post('/api/stories')
      .set('Authorization', token)
      .send({
        description: "test"
      })

    expect(createResponse.status).toEqual(201);
    expect(createResponse.error).toBeFalsy();

    const storiesResponse = await request(app)
      .get(`/api/stories/1`)
      .set('Authorization', token);

    expect(storiesResponse.status).toEqual(200);
    expect(storiesResponse.body.data).toBeDefined();
  });
});
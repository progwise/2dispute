import http from 'http';
import request from 'supertest';
import createTestServer from '../utils/testing/createTestServer';
import { closeConnection } from './mongoose';

let app: http.Server;

beforeAll(() => (app = createTestServer()));

afterAll(async () => {
  await closeConnection();
  app.close();
});

test('resolve simple request', async () => {
  const simpleQuery = `
    {
      me {
        id
      }
    }
  `;

  const result = await request(app)
    .post('')
    .send({ query: simpleQuery })
    .expect(200);

  expect(result.body.errors).toBeUndefined();
});

test('rejects complex queries', async () => {
  const complexQuery = `
    {
      complexQuery: allSubjects {
        edges {
          node {
            id
            author {
              allSubjects {
                edges {
                  node {
                    id
                    author {
                      allSubjects {
                        edges {
                          node {
                            id
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }  
  `;

  const result = await request(app)
    .post('')
    .send({ query: complexQuery })
    .expect(400);

  expect(result.body.data).toBeUndefined();
  expect(result.body.errors).toHaveLength(1);
  expect(result.body.errors[0].message).toBe('the query is too complex');
});

import http from 'http';
import request from 'supertest';
import createTestServer from '../../utils/testing/createTestServer';
import {
  closeConnection,
  getMongooseHelper,
  MongooseHelper,
} from '../mongoose';
import { subject1, subject2 } from '../../testing/fixtures/subjects';
import getTwitterUserById from '../User/getTwitterUserById';

jest.mock('../User/getTwitterUserById');
const mockedGetTwitterUserById = (getTwitterUserById as unknown) as jest.Mock;

let app: http.Server;
let mongoose: MongooseHelper;

beforeAll(async () => {
  app = createTestServer();
  mongoose = await getMongooseHelper();
});

afterAll(async () => {
  await closeConnection();
  app.close();
});

beforeEach(async () => {
  await mongoose.models.Subject.deleteMany({}).exec();
  jest.resetAllMocks();
});

describe('query subject', () => {
  const subjectQuery = `
    {
      subject(id: "123456789012345678901234") {
        id
        subject
        disputes {
          id
          createdAt
        }
        hasDisputes
        firstMessage {
          text
        }
        author {
          id
        }
        lastUpdateAt
      }
    }
  `;

  test('subject query returns null when subject not exists', async () => {
    const result = await request(app)
      .post('')
      .send({ query: subjectQuery })
      .expect(200);

    expect(result.body.data.subject).toBeNull();
    expect(result.body.errors).toBeUndefined();
  });

  test('subject returns subject when exists', async () => {
    mockedGetTwitterUserById.mockResolvedValue({
      id: '1',
      name: 'User1',
    });

    await new mongoose.models.Subject(subject1).save();

    const result = await request(app)
      .post('')
      .send({ query: subjectQuery })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "subject": Object {
            "author": Object {
              "id": "1",
            },
            "disputes": Array [
              Object {
                "createdAt": "2020-06-15T11:00:00.000Z",
                "id": "a17456a1410c7fb7ed325372",
              },
              Object {
                "createdAt": "2020-06-15T10:00:00.000Z",
                "id": "bbaeec62fed1fe8eff4bc127",
              },
            ],
            "firstMessage": Object {
              "text": "In my opinion",
            },
            "hasDisputes": true,
            "id": "123456789012345678901234",
            "lastUpdateAt": "2020-06-15T11:00:00.000Z",
            "subject": "testSubject",
          },
        },
      }
    `);
    expect(mockedGetTwitterUserById).toHaveBeenCalledWith('1');
  });
});

describe('query allSubjects', () => {
  const allSubjectsQuery = `
  {
    allSubjects{
      edges {
        node {
          id
          lastUpdateAt
          hasDisputes
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  `;

  test('allSubjects when empty', async () => {
    const result = await request(app)
      .post('')
      .send({ query: allSubjectsQuery })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "allSubjects": Object {
            "edges": Array [],
            "pageInfo": Object {
              "endCursor": "",
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "",
            },
          },
        },
      }
    `);
  });

  describe('with subjects', () => {
    beforeEach(async () => {
      await new mongoose.models.Subject(subject1).save();
      await new mongoose.models.Subject(subject2).save();
    });

    test('allSubjects with subjects', async () => {
      const result = await request(app)
        .post('')
        .send({ query: allSubjectsQuery })
        .expect(200);

      expect(result.body).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "allSubjects": Object {
              "edges": Array [
                Object {
                  "cursor": "ODFjNDA4ODM2ZmMyZTUyOGU3ZWQ4MmYz",
                  "node": Object {
                    "hasDisputes": false,
                    "id": "81c408836fc2e528e7ed82f3",
                    "lastUpdateAt": "2020-06-15T11:00:00.000Z",
                  },
                },
                Object {
                  "cursor": "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0",
                  "node": Object {
                    "hasDisputes": true,
                    "id": "123456789012345678901234",
                    "lastUpdateAt": "2020-06-15T11:00:00.000Z",
                  },
                },
              ],
              "pageInfo": Object {
                "endCursor": "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0",
                "hasNextPage": false,
                "hasPreviousPage": false,
                "startCursor": "ODFjNDA4ODM2ZmMyZTUyOGU3ZWQ4MmYz",
              },
            },
          },
        }
      `);
    });

    test('allSubjects with hasDisputes=true filter', async () => {
      const allSubjectsHasDisputesFilterQuery = `
      {
        allSubjects(filter: { hasDisputes: true }){
          edges {
            node {
              id
              hasDisputes
            }
          }
        }
      }
      `;

      const result = await request(app)
        .post('')
        .send({ query: allSubjectsHasDisputesFilterQuery })
        .expect(200);

      expect(result.body).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "allSubjects": Object {
              "edges": Array [
                Object {
                  "node": Object {
                    "hasDisputes": true,
                    "id": "123456789012345678901234",
                  },
                },
              ],
            },
          },
        }
      `);
    });

    test('allSubjects with hasDisputes=false filter', async () => {
      const allSubjectsHasDisputesFilterQuery = `
        {
          allSubjects(filter: { hasDisputes: false }){
            edges {
              node {
                id
                hasDisputes
              }
            }
          }
        }
        `;

      const result = await request(app)
        .post('')
        .send({ query: allSubjectsHasDisputesFilterQuery })
        .expect(200);

      expect(result.body).toMatchInlineSnapshot(`
          Object {
            "data": Object {
              "allSubjects": Object {
                "edges": Array [
                  Object {
                    "node": Object {
                      "hasDisputes": false,
                      "id": "81c408836fc2e528e7ed82f3",
                    },
                  },
                ],
              },
            },
          }
        `);
    });
  });
});

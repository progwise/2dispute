import http from 'http';
import server from '../../graphql';
import mongooseMiddleware from '../../graphql/mongoose';
import customCookieParser from './customCookieParser';

const createTestServer = (): http.Server =>
  http.createServer(
    customCookieParser(mongooseMiddleware(server.createHandler({ path: '/' }))),
  );

export default createTestServer;

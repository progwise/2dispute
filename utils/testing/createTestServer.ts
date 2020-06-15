import http from 'http';
import server from '../../graphql';
import customCookieParser from './customCookieParser';

const createTestServer = (): http.Server =>
  http.createServer(customCookieParser(server.createHandler({ path: '/' })));

export default createTestServer;

import { NextApiRequest } from 'next';
import createAbsoluteURL from './createAbsoluteURL';

const req = {
  headers: {
    host: 'localhost:3000',
  },
} as NextApiRequest;

test('it works for simple routes', () => {
  const url = createAbsoluteURL(req, '/simple/route');
  expect(url).toBe('https://localhost:3000/simple/route');
});

test('it works for routes with query params in path', () => {
  const url = createAbsoluteURL(req, '/route?query=param');
  expect(url).toBe('https://localhost:3000/route?query=param');
});

test('it works with additional query params', () => {
  const url = createAbsoluteURL(req, '/route', { customParam: true });
  expect(url).toBe('https://localhost:3000/route?customParam=true');
});

test('it works with query params in path and additional query params', () => {
  const url = createAbsoluteURL(req, '/route?query=param', {
    customParam: true,
  });
  expect(url).toBe('https://localhost:3000/route?query=param&customParam=true');
});

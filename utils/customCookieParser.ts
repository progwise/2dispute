import { NextApiHandler } from 'next';
import { parse } from 'cookie';

export default (handler): NextApiHandler => (req, res): void => {
  let cookies: {
    [key: string]: string;
  } = {};

  if (req.headers.cookie) {
    try {
      cookies = parse(req.headers.cookie);
    } catch (err) {
      console.warn('Could not parse cookie', req.headers.cookie);
    }
  }

  req.cookies = cookies;

  return handler(req, res);
};

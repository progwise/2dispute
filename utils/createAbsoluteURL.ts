import url from 'url';
import { ParsedUrlQueryInput } from 'querystring';
import { NextApiRequest } from 'next';

export default (
  req: NextApiRequest,
  relativePath: string,
  query: ParsedUrlQueryInput = {},
): string =>
  url.format({
    host: req.headers.host,
    pathname: relativePath,
    protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
    query,
  });

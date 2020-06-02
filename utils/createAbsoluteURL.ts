import url from 'url';
import { Socket } from 'net';
import { ParsedUrlQueryInput } from 'querystring';
import { NextApiRequest } from 'next';

export default (
  req: NextApiRequest,
  relativePath: string,
  query: ParsedUrlQueryInput = {},
): string => {
  const connection: Socket & { encrypted?: true } = req.connection;

  return url.format({
    host: req.headers.host,
    pathname: relativePath,
    protocol: connection.encrypted ? 'https' : 'http',
    query,
  });
};

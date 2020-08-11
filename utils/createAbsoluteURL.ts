import url from 'url';
import qs, { ParsedUrlQueryInput } from 'querystring';
import { NextApiRequest } from 'next';

export default (
  req: NextApiRequest,
  relativePath: string,
  additionalQuery: ParsedUrlQueryInput = {},
): string => {
  const parsedUrl = url.parse(relativePath);

  const pathQueryString = parsedUrl.query;
  const additionalQueryString = qs.stringify(additionalQuery);

  const queryString = [pathQueryString, additionalQueryString]
    .filter(string => string !== null && string !== '')
    .join('&');

  return url.format({
    host: req.headers.host,
    pathname: parsedUrl.pathname,
    protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
    query: qs.parse(queryString),
  });
};

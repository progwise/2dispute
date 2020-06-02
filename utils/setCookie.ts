import { NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from 'cookie';

/**
 * This sets `cookie` on `res` object
 */
const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {},
): void => {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

export default setCookie;

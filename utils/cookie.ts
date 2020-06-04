import { NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from 'cookie';

const defaultCookieOptions: CookieSerializeOptions = {
  path: '/',
  sameSite: 'strict',
};

/**
 * This sets `cookie` on `res` object
 */
export const setCookie = (
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

  res.setHeader(
    'Set-Cookie',
    serialize(name, stringValue, { ...defaultCookieOptions, ...options }),
  );
};

export const deleteCookie = (res: NextApiResponse, name: string): void =>
  setCookie(res, name, undefined, { expires: new Date(0) });

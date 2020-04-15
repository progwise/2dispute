import { initAuth0 } from '@auth0/nextjs-auth0';
import { NextApiRequest } from 'next';
import { ISignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance';

const auth0Map = new Map<string, ISignInWithAuth0>();
const isProduction = process.env.NODE_ENV === 'production';

const createAuth0 = (host: string): ISignInWithAuth0 => {
  const protocol = isProduction ? 'https' : 'http';
  const url = `${protocol}://${host}`;

  return initAuth0({
    domain: process.env.AUTH0_DOMAIN ?? '',
    clientId: process.env.AUTH0_CLIENT_ID ?? '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'openid profile',
    redirectUri: `${url}/api/callback`,
    postLogoutRedirectUri: url,
    session: {
      cookieSecret: process.env.COOKIE_SECRET ?? '',
    },
  });
};

export default (req: NextApiRequest): ISignInWithAuth0 => {
  const host = req?.headers?.host ?? 'http://localhost:3000';

  const auth0 = auth0Map.get(host);
  if (auth0) {
    return auth0;
  }

  const newAut0 = createAuth0(host);
  auth0Map.set(host, newAut0);
  return newAut0;
};

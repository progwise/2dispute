import { ManagementClient } from 'auth0';

export default new ManagementClient({
  domain: process.env.AUTH0_DOMAIN ?? '',
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  scope: 'read:users',
});

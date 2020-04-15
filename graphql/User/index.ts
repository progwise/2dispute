import { User } from '../generated/graphql';
import Auth0ManagementClient from './auth0ManagementClient';

export const getUserById = async (userId: string): Promise<User> => {
  const user = await Auth0ManagementClient.getUser({ id: userId });
  if (user.nickname === undefined) {
    throw new Error('Username not found');
  }

  return {
    id: userId,
    name: user.nickname,
  };
};

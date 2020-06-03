export { default as getTwitterUserById } from './getTwitterUserById';
export { default as userQueries } from './queries';
export { default as userResolvers } from './resolvers';

export interface UserMapper {
  id: string;
  name: string;
  picture?: string;
}

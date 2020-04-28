export { default as getUserById } from './getUserById';
export { default as userQueries } from './queries';
export { default as userResolvers } from './resolvers';

export interface UserMapper {
  id: string;
  name: string;
  picture?: string;
}

import { MessageResolvers } from '../generated/graphql';
import { getUserById } from '../User';

const resolvers: MessageResolvers = {
  author: parent => getUserById(parent.authorId),
};

export default resolvers;

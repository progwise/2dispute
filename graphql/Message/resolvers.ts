import { MessageResolvers } from '../generated/graphql';

const resolvers: MessageResolvers = {
  author: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.authorId),
};

export default resolvers;

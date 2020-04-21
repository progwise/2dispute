import { MessageResolvers } from '../generated/graphql';

const resolvers: MessageResolvers = {
  id: parent => parent._id.toString(),
  author: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.authorId),
};

export default resolvers;

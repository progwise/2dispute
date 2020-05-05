import { MessageResolvers } from '../generated/graphql';

const resolvers: MessageResolvers = {
  id: parent => parent._id.toString(),
  author: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.authorId),
  dispute: async (parent, _args, context) => {
    const data = await context.mongoose.models.Subject.aggregate()
      .unwind('disputes')
      .match({ 'disputes.messages._id': parent._id })
      .exec();

    return data[0].disputes || undefined;
  },
};

export default resolvers;

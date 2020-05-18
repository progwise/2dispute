import { MessageResolvers } from '../generated/backend';
import getUserVoting from './helpers/getUserVoting';

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
  votes: (parent, _args, context) => {
    const userId = context.user?.id ?? '';

    return {
      ups: parent.upVoters.length,
      downs: parent.downVoters.length,
      userVoting: getUserVoting(parent, userId),
    };
  },
};

export default resolvers;

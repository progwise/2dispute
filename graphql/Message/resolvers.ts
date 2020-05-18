import { MessageResolvers, UserVoting } from '../generated/backend';

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
    const isUpVoter = parent.upVoters.includes(userId);
    const isDownVoter = parent.downVoters.includes(userId);

    let userVoting: UserVoting;
    if (isUpVoter) {
      userVoting = UserVoting.Up;
    } else if (isDownVoter) {
      userVoting = UserVoting.Down;
    } else {
      userVoting = UserVoting.None;
    }

    return {
      ups: parent.upVoters.length,
      downs: parent.downVoters.length,
      userVoting,
    };
  },
};

export default resolvers;

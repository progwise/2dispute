import { ApolloError } from 'apollo-server-micro';
import { DisputeResolvers } from '../generated/backend';

const resolvers: DisputeResolvers = {
  id: partent => partent._id.toString(),
  partnerA: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.partnerIdA),
  partnerB: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.partnerIdB),
  subject: async (parent, _arg, context) => {
    const subject = await context.mongoose.models.Subject.findOne({
      'disputes._id': parent._id,
    }).exec();

    if (!subject) throw new ApolloError('Subject not found');

    return subject;
  },
  lastUpdateAt: parent => parent.lastMessageAt.toISOString(),
};

export default resolvers;

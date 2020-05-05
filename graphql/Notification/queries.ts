import { ApolloError } from 'apollo-server-micro';
import { QueryResolvers } from '../generated/graphql';

const queries: QueryResolvers = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  meNotification: (_parent, _args, context) => {
    if (!context.user) {
      throw new ApolloError('User not found');
    }

    return context.mongoose.models.Notification.find()
      .where('userId', context.user.id)
      .sort('-createdAt')
      .exec();
  },
};

export default queries;

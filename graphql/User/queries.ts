import { QueryResolvers } from '../generated/graphql';

const queries: QueryResolvers = {
  me: (_parent, _args, context) =>
    context.user
      ? context.dataloaders.userDataloader.load(context.user.id)
      : null,
};

export default queries;

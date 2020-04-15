import { QueryResolvers } from '../generated/graphql';
import { getUserById } from '.';

const queries: QueryResolvers = {
  me: (_parent, _args, context) =>
    context.user ? getUserById(context.user.id) : null,
};

export default queries;

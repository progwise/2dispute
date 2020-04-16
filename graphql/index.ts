import { ApolloServer } from 'apollo-server-micro';
import { Resolvers, typeDefs } from './generated/graphql';
import context from './context';
import { subjectResolvers, subjectQueries, subjectMutations } from './Subject';
import schemaDirectives from './schemaDirectives';
import { userQueries } from './User';
import { disputeResolvers, disputeQueries, disputeMutations } from './Dispute';
import { messageResolvers } from './Message';

const resolvers: Resolvers = {
  Query: {
    ...subjectQueries,
    ...userQueries,
    ...disputeQueries,
  },
  Mutation: {
    ...subjectMutations,
    ...disputeMutations,
  },
  Subject: subjectResolvers,
  Dispute: disputeResolvers,
  Message: messageResolvers,
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
});

import { ApolloServer } from 'apollo-server-micro';
import { Resolvers, typeDefs } from './generated/graphql';
import context from './context';
import { subjectResolvers, subjectQueries, subjectMutations } from './Subject';
import schemaDirectives from './schemaDirectives';
import { userQueries } from './User';

const resolvers: Resolvers = {
  Query: {
    ...subjectQueries,
    ...userQueries,
  },
  Mutation: {
    ...subjectMutations,
  },
  Subject: subjectResolvers,
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
});

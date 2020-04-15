import { ApolloServer } from 'apollo-server-micro';
import { Resolvers, typeDefs } from './generated/graphql';
import context from './context';
import { subjectResolvers, subjectQueries, subjectMutations } from './Subject';
import schemaDirectives from './schemaDirectives';

const resolvers: Resolvers = {
  Query: {
    ...subjectQueries,
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

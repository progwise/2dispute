import { ApolloServer } from 'apollo-server-micro';
import { importSchema } from 'graphql-import';
import { Resolvers } from './generated/graphql';
import context from './context';
import { subjectResolvers, subjectQueries, subjectMutations } from './Subject';
import schemaDirectives from './schemaDirectives';

const typeDefs = importSchema('./graphql/schema.graphql');

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

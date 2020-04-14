import { ApolloServer } from 'apollo-server-micro';
import { importSchema } from 'graphql-import';
import { Resolvers } from './generated/graphql';
import context from './context';
import { subjectQueries, subjectMutations } from './Subject';

const typeDefs = importSchema('./graphql/schema.graphql');

const resolvers: Resolvers = {
  Query: {
    sayHello: (_parent, { name = 'World' }): string => `Hello ${name}`,
    ...subjectQueries,
  },
  Mutation: {
    ...subjectMutations,
  },
};

export default new ApolloServer({ typeDefs, resolvers, context });

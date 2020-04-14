import { ApolloServer } from 'apollo-server-micro';
import { importSchema } from 'graphql-import';
import { Resolvers } from './generated/graphql';

const typeDefs = importSchema('./graphql/schema.graphql');

const resolvers: Resolvers = {
  Query: {
    sayHello: (_parent, { name = 'World' }): string => `Hello ${name}`,
  },
};

export default new ApolloServer({ typeDefs, resolvers });

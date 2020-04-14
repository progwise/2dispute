import { ApolloServer } from 'apollo-server-micro';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema('./graphql/schema.graphql');

const resolvers = {
  Query: {
    sayHello: (_parent: never, { name = 'World' }: { name?: string }): string =>
      `Hello ${name}`,
  },
};

export default new ApolloServer({ typeDefs, resolvers });

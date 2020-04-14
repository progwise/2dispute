import { gql, ApolloServer } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    sayHello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    sayHello: (_parent: never, { name = 'World' }: { name?: string }): string =>
      `Hello ${name}`,
  },
};

export default new ApolloServer({ typeDefs, resolvers });

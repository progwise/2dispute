import { ApolloServer } from 'apollo-server-micro';
import { importSchema } from 'graphql-import';
import { v4 as uuid } from 'uuid';
import { Resolvers, Subject } from './generated/graphql';

const typeDefs = importSchema('./graphql/schema.graphql');

let subjectStore: Subject[] = [];

const resolvers: Resolvers = {
  Query: {
    sayHello: (_parent, { name = 'World' }): string => `Hello ${name}`,
    allSubjects: (): Subject[] => subjectStore,
  },
  Mutation: {
    createSubject: (_parent, { input }): Subject => {
      const subject: Subject = {
        id: uuid(),
        subject: input.subject,
        tweetId: input.tweetId,
      };
      subjectStore = [...subjectStore, subject];
      return subject;
    },
  },
};

export default new ApolloServer({ typeDefs, resolvers });

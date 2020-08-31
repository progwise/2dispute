import { ApolloServer, ApolloError } from 'apollo-server-micro';
import { GraphQLDateTime } from 'graphql-iso-date';
import { separateOperations, buildSchema } from 'graphql';
import {
  getComplexity,
  simpleEstimator,
  directiveEstimator,
} from 'graphql-query-complexity';
import { Resolvers, typeDefs } from './generated/backend';
import context from './context';
import { subjectResolvers, subjectQueries, subjectMutations } from './Subject';
import schemaDirectives from './schemaDirectives';
import { userQueries, userResolvers } from './User';
import { disputeResolvers, disputeQueries, disputeMutations } from './Dispute';
import { messageResolvers, messageMutations } from './Message';
import { tweetQueries } from './Tweet';
import { chatQueries, chatItemResolvers } from './Chat';

const resolvers: Resolvers = {
  Query: {
    ...subjectQueries,
    ...userQueries,
    ...disputeQueries,
    ...tweetQueries,
    ...chatQueries,
  },
  Mutation: {
    ...subjectMutations,
    ...disputeMutations,
    ...messageMutations,
  },
  Subject: subjectResolvers,
  Dispute: disputeResolvers,
  Message: messageResolvers,
  User: userResolvers,
  DateTime: GraphQLDateTime,
  ChatItem: chatItemResolvers,
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
  plugins: [
    {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      requestDidStart: () => ({
        didResolveOperation: ({ request, document }): void => {
          const complexity = getComplexity({
            schema: buildSchema(typeDefs),
            query: request.operationName
              ? separateOperations(document)[request.operationName]
              : document,
            variables: request.variables,
            estimators: [
              directiveEstimator({ name: 'complexity' }),
              simpleEstimator({ defaultComplexity: 1 }),
            ],
          });

          if (complexity >= 400) {
            throw new ApolloError('the query is too complex');
          }
        },
      }),
    },
  ],
});

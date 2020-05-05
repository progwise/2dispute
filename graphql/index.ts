import { ApolloServer } from 'apollo-server-micro';
import { GraphQLDateTime } from 'graphql-iso-date';
import { Resolvers, typeDefs } from './generated/graphql';
import context from './context';
import { subjectResolvers, subjectQueries, subjectMutations } from './Subject';
import schemaDirectives from './schemaDirectives';
import { userQueries, userResolvers } from './User';
import { disputeResolvers, disputeQueries, disputeMutations } from './Dispute';
import { messageResolvers } from './Message';
import { notificationQueries, notificationResolvers } from './Notification';
import { newDisputeNotificationResolvers } from './Notification/NewDisputeNotification';
import { newMessageNotificationResolvers } from './Notification/NewMessageNotification';

const resolvers: Resolvers = {
  Query: {
    ...subjectQueries,
    ...userQueries,
    ...disputeQueries,
    ...notificationQueries,
  },
  Mutation: {
    ...subjectMutations,
    ...disputeMutations,
  },
  Subject: subjectResolvers,
  Dispute: disputeResolvers,
  Message: messageResolvers,
  User: userResolvers,
  DateTime: GraphQLDateTime,
  Notification: notificationResolvers,
  NewDisputeNotification: newDisputeNotificationResolvers,
  NewMessageNotification: newMessageNotificationResolvers,
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
});

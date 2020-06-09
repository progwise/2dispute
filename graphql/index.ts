import { ApolloServer } from 'apollo-server-micro';
import { GraphQLDateTime } from 'graphql-iso-date';
import { Resolvers, typeDefs } from './generated/backend';
import context from './context';
import { subjectResolvers, subjectQueries, subjectMutations } from './Subject';
import schemaDirectives from './schemaDirectives';
import { userQueries, userResolvers } from './User';
import { disputeResolvers, disputeQueries, disputeMutations } from './Dispute';
import { messageResolvers, messageMutations } from './Message';
import {
  notificationQueries,
  notificationResolvers,
  notificationMutations,
} from './Notification';
import { tweetQueries } from './Tweet';
import { newDisputeNotificationResolvers } from './Notification/NewDisputeNotification';
import { newMessageNotificationResolvers } from './Notification/NewMessageNotification';
import { notificationsUpdateResolvers } from './Notification/NotificationsUpdate';

const resolvers: Resolvers = {
  Query: {
    ...subjectQueries,
    ...userQueries,
    ...disputeQueries,
    ...notificationQueries,
    ...tweetQueries,
  },
  Mutation: {
    ...subjectMutations,
    ...disputeMutations,
    ...notificationMutations,
    ...messageMutations,
  },
  Subject: subjectResolvers,
  Dispute: disputeResolvers,
  Message: messageResolvers,
  User: userResolvers,
  DateTime: GraphQLDateTime,
  Notification: notificationResolvers,
  NewDisputeNotification: newDisputeNotificationResolvers,
  NewMessageNotification: newMessageNotificationResolvers,
  NotificationsUpdate: notificationsUpdateResolvers,
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
});

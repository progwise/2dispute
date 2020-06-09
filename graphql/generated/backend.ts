/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { SubjectDocument } from '../Subject/SubjectSchema';
import { DisputeDocument } from '../Dispute/DisputeSchema';
import { MessageDocument } from '../Message/MessageSchema';
import {
  NewDisputeNotificationDocument,
  NewMessageNotificationDocument,
} from '../Notification/NotificationSchema';
import { NotificationsUpdateMapper } from '../Notification/NotificationsUpdateMapper';
import { UserMapper } from '../User';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type Query = {
  __typename?: 'Query';
  allDisputes: DisputeConnection;
  allNotifications?: Maybe<NotificationConnection>;
  allSubjects: SubjectConnection;
  dispute?: Maybe<Dispute>;
  me?: Maybe<User>;
  notificationStatus: NotificationStatus;
  subject?: Maybe<Subject>;
  twitterTimeline?: Maybe<Array<Tweet>>;
  user?: Maybe<User>;
};

export type QueryAllDisputesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type QueryAllNotificationsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type QueryAllSubjectsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<SubjectFilter>;
};

export type QueryDisputeArgs = {
  id: Scalars['ID'];
};

export type QuerySubjectArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubject: Subject;
  markMultipleNotificationAsRead: Array<Notification>;
  markNotificationAsRead: Notification;
  markNotificationsAsReadForDispute: NotificationsUpdate;
  replyOnDispute: Dispute;
  replyOnSubject: Dispute;
  vote: Message;
};

export type MutationCreateSubjectArgs = {
  input: SubjectCreateInput;
};

export type MutationMarkMultipleNotificationAsReadArgs = {
  latestId: Scalars['ID'];
};

export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID'];
};

export type MutationMarkNotificationsAsReadForDisputeArgs = {
  disputeId: Scalars['ID'];
};

export type MutationReplyOnDisputeArgs = {
  input: ReplyOnDisputInput;
};

export type MutationReplyOnSubjectArgs = {
  input: ReplyOnSubjectInput;
};

export type MutationVoteArgs = {
  messageId: Scalars['ID'];
  voting: UserVoting;
};

export type Subject = {
  __typename?: 'Subject';
  author: User;
  createdAt: Scalars['DateTime'];
  disputes: Array<Dispute>;
  firstMessage: Message;
  hasDisputes: Scalars['Boolean'];
  id: Scalars['ID'];
  subject: Scalars['String'];
  tweetId?: Maybe<Scalars['String']>;
};

export type SubjectCreateInput = {
  firstMessage: Scalars['String'];
  subject: Scalars['String'];
  tweetId?: Maybe<Scalars['String']>;
};

export type ReplyOnSubjectInput = {
  message: Scalars['String'];
  subjectId: Scalars['ID'];
};

export type SubjectConnection = {
  __typename?: 'SubjectConnection';
  edges: Array<SubjectEdge>;
  pageInfo: PageInfo;
};

export type SubjectFilter = {
  hasDisputes?: Maybe<Scalars['Boolean']>;
};

export type Dispute = {
  __typename?: 'Dispute';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  lastMessageAt: Scalars['DateTime'];
  messages: Array<Message>;
  partnerA: User;
  partnerB: User;
  subject: Subject;
};

export type DisputeConnection = {
  __typename?: 'DisputeConnection';
  edges: Array<DisputeEdge>;
  pageInfo: PageInfo;
};

export type ReplyOnDisputInput = {
  disputeId: Scalars['ID'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  allDisputes: DisputeConnection;
  allSubjects: SubjectConnection;
  id: Scalars['ID'];
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
};

export type UserAllDisputesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type UserAllSubjectsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type NotificationStatus = {
  __typename?: 'NotificationStatus';
  totalCountUnread: Scalars['Int'];
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  edges: Array<NotificationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NotificationsUpdate = {
  __typename?: 'NotificationsUpdate';
  notificationStatus: NotificationStatus;
  updatedNotification: Array<Notification>;
};

export type Message = {
  __typename?: 'Message';
  author: User;
  createdAt: Scalars['DateTime'];
  dispute: Dispute;
  id: Scalars['ID'];
  text: Scalars['String'];
  votes: Votes;
};

export enum UserVoting {
  Up = 'UP',
  Down = 'DOWN',
  None = 'NONE',
}

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Notification = {
  id: Scalars['ID'];
  read: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};

export type SubjectEdge = {
  __typename?: 'SubjectEdge';
  cursor: Scalars['String'];
  node: Subject;
};

export type DisputeEdge = {
  __typename?: 'DisputeEdge';
  cursor: Scalars['String'];
  node: Dispute;
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String'];
  node: Notification;
};

export type Votes = {
  __typename?: 'Votes';
  ups: Scalars['Int'];
  downs: Scalars['Int'];
  userVoting: UserVoting;
};

export type NewMessageNotification = Notification & {
  __typename?: 'NewMessageNotification';
  id: Scalars['ID'];
  read: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  message: Message;
};

export type NewDisputeNotification = Notification & {
  __typename?: 'NewDisputeNotification';
  id: Scalars['ID'];
  read: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  dispute: Dispute;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Subject: ResolverTypeWrapper<SubjectDocument>;
  SubjectCreateInput: SubjectCreateInput;
  ReplyOnSubjectInput: ReplyOnSubjectInput;
  SubjectConnection: ResolverTypeWrapper<
    Omit<SubjectConnection, 'edges'> & {
      edges: Array<ResolversTypes['SubjectEdge']>;
    }
  >;
  SubjectFilter: SubjectFilter;
  Dispute: ResolverTypeWrapper<DisputeDocument>;
  DisputeConnection: ResolverTypeWrapper<
    Omit<DisputeConnection, 'edges'> & {
      edges: Array<ResolversTypes['DisputeEdge']>;
    }
  >;
  ReplyOnDisputInput: ReplyOnDisputInput;
  User: ResolverTypeWrapper<UserMapper>;
  NotificationStatus: ResolverTypeWrapper<NotificationStatus>;
  NotificationConnection: ResolverTypeWrapper<NotificationConnection>;
  NotificationsUpdate: ResolverTypeWrapper<NotificationsUpdateMapper>;
  Message: ResolverTypeWrapper<MessageDocument>;
  UserVoting: UserVoting;
  Tweet: ResolverTypeWrapper<Tweet>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Notification:
    | ResolversTypes['NewMessageNotification']
    | ResolversTypes['NewDisputeNotification'];
  SubjectEdge: ResolverTypeWrapper<
    Omit<SubjectEdge, 'node'> & { node: ResolversTypes['Subject'] }
  >;
  DisputeEdge: ResolverTypeWrapper<
    Omit<DisputeEdge, 'node'> & { node: ResolversTypes['Dispute'] }
  >;
  NotificationEdge: ResolverTypeWrapper<NotificationEdge>;
  Votes: ResolverTypeWrapper<Votes>;
  NewMessageNotification: ResolverTypeWrapper<NewMessageNotificationDocument>;
  NewDisputeNotification: ResolverTypeWrapper<NewDisputeNotificationDocument>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Query: {};
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  Mutation: {};
  Subject: SubjectDocument;
  SubjectCreateInput: SubjectCreateInput;
  ReplyOnSubjectInput: ReplyOnSubjectInput;
  SubjectConnection: Omit<SubjectConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['SubjectEdge']>;
  };
  SubjectFilter: SubjectFilter;
  Dispute: DisputeDocument;
  DisputeConnection: Omit<DisputeConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['DisputeEdge']>;
  };
  ReplyOnDisputInput: ReplyOnDisputInput;
  User: UserMapper;
  NotificationStatus: NotificationStatus;
  NotificationConnection: NotificationConnection;
  NotificationsUpdate: NotificationsUpdateMapper;
  Message: MessageDocument;
  UserVoting: UserVoting;
  Tweet: Tweet;
  PageInfo: PageInfo;
  Notification:
    | ResolversParentTypes['NewMessageNotification']
    | ResolversParentTypes['NewDisputeNotification'];
  SubjectEdge: Omit<SubjectEdge, 'node'> & {
    node: ResolversParentTypes['Subject'];
  };
  DisputeEdge: Omit<DisputeEdge, 'node'> & {
    node: ResolversParentTypes['Dispute'];
  };
  NotificationEdge: NotificationEdge;
  Votes: Votes;
  NewMessageNotification: NewMessageNotificationDocument;
  NewDisputeNotification: NewDisputeNotificationDocument;
}>;

export type AuthDirectiveArgs = {};

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  allDisputes?: Resolver<
    ResolversTypes['DisputeConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryAllDisputesArgs, 'first' | 'last'>
  >;
  allNotifications?: Resolver<
    Maybe<ResolversTypes['NotificationConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllNotificationsArgs, 'first' | 'last'>
  >;
  allSubjects?: Resolver<
    ResolversTypes['SubjectConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryAllSubjectsArgs, 'first' | 'last'>
  >;
  dispute?: Resolver<
    Maybe<ResolversTypes['Dispute']>,
    ParentType,
    ContextType,
    RequireFields<QueryDisputeArgs, 'id'>
  >;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  notificationStatus?: Resolver<
    ResolversTypes['NotificationStatus'],
    ParentType,
    ContextType
  >;
  subject?: Resolver<
    Maybe<ResolversTypes['Subject']>,
    ParentType,
    ContextType,
    RequireFields<QuerySubjectArgs, 'id'>
  >;
  twitterTimeline?: Resolver<
    Maybe<Array<ResolversTypes['Tweet']>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
}>;

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createSubject?: Resolver<
    ResolversTypes['Subject'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSubjectArgs, 'input'>
  >;
  markMultipleNotificationAsRead?: Resolver<
    Array<ResolversTypes['Notification']>,
    ParentType,
    ContextType,
    RequireFields<MutationMarkMultipleNotificationAsReadArgs, 'latestId'>
  >;
  markNotificationAsRead?: Resolver<
    ResolversTypes['Notification'],
    ParentType,
    ContextType,
    RequireFields<MutationMarkNotificationAsReadArgs, 'id'>
  >;
  markNotificationsAsReadForDispute?: Resolver<
    ResolversTypes['NotificationsUpdate'],
    ParentType,
    ContextType,
    RequireFields<MutationMarkNotificationsAsReadForDisputeArgs, 'disputeId'>
  >;
  replyOnDispute?: Resolver<
    ResolversTypes['Dispute'],
    ParentType,
    ContextType,
    RequireFields<MutationReplyOnDisputeArgs, 'input'>
  >;
  replyOnSubject?: Resolver<
    ResolversTypes['Dispute'],
    ParentType,
    ContextType,
    RequireFields<MutationReplyOnSubjectArgs, 'input'>
  >;
  vote?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationVoteArgs, 'messageId' | 'voting'>
  >;
}>;

export type SubjectResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Subject'] = ResolversParentTypes['Subject']
> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  disputes?: Resolver<
    Array<ResolversTypes['Dispute']>,
    ParentType,
    ContextType
  >;
  firstMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  hasDisputes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SubjectConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SubjectConnection'] = ResolversParentTypes['SubjectConnection']
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['SubjectEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DisputeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Dispute'] = ResolversParentTypes['Dispute']
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastMessageAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  messages?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  partnerA?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  partnerB?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['Subject'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DisputeConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['DisputeConnection'] = ResolversParentTypes['DisputeConnection']
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['DisputeEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  allDisputes?: Resolver<
    ResolversTypes['DisputeConnection'],
    ParentType,
    ContextType,
    RequireFields<UserAllDisputesArgs, 'first' | 'last'>
  >;
  allSubjects?: Resolver<
    ResolversTypes['SubjectConnection'],
    ParentType,
    ContextType,
    RequireFields<UserAllSubjectsArgs, 'first' | 'last'>
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NotificationStatusResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['NotificationStatus'] = ResolversParentTypes['NotificationStatus']
> = ResolversObject<{
  totalCountUnread?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NotificationConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['NotificationConnection'] = ResolversParentTypes['NotificationConnection']
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes['NotificationEdge']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NotificationsUpdateResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['NotificationsUpdate'] = ResolversParentTypes['NotificationsUpdate']
> = ResolversObject<{
  notificationStatus?: Resolver<
    ResolversTypes['NotificationStatus'],
    ParentType,
    ContextType
  >;
  updatedNotification?: Resolver<
    Array<ResolversTypes['Notification']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MessageResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dispute?: Resolver<ResolversTypes['Dispute'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votes?: Resolver<ResolversTypes['Votes'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TweetResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Tweet'] = ResolversParentTypes['Tweet']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NotificationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'NewMessageNotification' | 'NewDisputeNotification',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type SubjectEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SubjectEdge'] = ResolversParentTypes['SubjectEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Subject'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type DisputeEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['DisputeEdge'] = ResolversParentTypes['DisputeEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Dispute'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NotificationEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['NotificationEdge'] = ResolversParentTypes['NotificationEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Notification'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type VotesResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Votes'] = ResolversParentTypes['Votes']
> = ResolversObject<{
  ups?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  downs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userVoting?: Resolver<ResolversTypes['UserVoting'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NewMessageNotificationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['NewMessageNotification'] = ResolversParentTypes['NewMessageNotification']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NewDisputeNotificationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['NewDisputeNotification'] = ResolversParentTypes['NewDisputeNotification']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dispute?: Resolver<ResolversTypes['Dispute'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subject?: SubjectResolvers<ContextType>;
  SubjectConnection?: SubjectConnectionResolvers<ContextType>;
  Dispute?: DisputeResolvers<ContextType>;
  DisputeConnection?: DisputeConnectionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  NotificationStatus?: NotificationStatusResolvers<ContextType>;
  NotificationConnection?: NotificationConnectionResolvers<ContextType>;
  NotificationsUpdate?: NotificationsUpdateResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Notification?: NotificationResolvers;
  SubjectEdge?: SubjectEdgeResolvers<ContextType>;
  DisputeEdge?: DisputeEdgeResolvers<ContextType>;
  NotificationEdge?: NotificationEdgeResolvers<ContextType>;
  Votes?: VotesResolvers<ContextType>;
  NewMessageNotification?: NewMessageNotificationResolvers<ContextType>;
  NewDisputeNotification?: NewDisputeNotificationResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<
  ContextType
>;

export const typeDefs = `
directive @auth on FIELD_DEFINITION

scalar DateTime

type Query {
  allDisputes(first: Int = 10, after: String, last: Int = 10, before: String): DisputeConnection!
  allNotifications(first: Int = 10, after: String, last: Int = 10, before: String): NotificationConnection
  allSubjects(first: Int = 10, after: String, last: Int = 10, before: String, filter: SubjectFilter): SubjectConnection!
  dispute(id: ID!): Dispute
  me: User
  notificationStatus: NotificationStatus!
  subject(id: ID!): Subject
  twitterTimeline: [Tweet!]
  user(id: ID!): User
}

type Mutation {
  createSubject(input: SubjectCreateInput!): Subject!
  markMultipleNotificationAsRead(latestId: ID!): [Notification!]!
  markNotificationAsRead(id: ID!): Notification!
  markNotificationsAsReadForDispute(disputeId: ID!): NotificationsUpdate!
  replyOnDispute(input: ReplyOnDisputInput!): Dispute!
  replyOnSubject(input: ReplyOnSubjectInput!): Dispute!
  vote(messageId: ID!, voting: UserVoting!): Message!
}

type Subject {
  author: User!
  createdAt: DateTime!
  disputes: [Dispute!]!
  firstMessage: Message!
  hasDisputes: Boolean!
  id: ID!
  subject: String!
  tweetId: String
}

input SubjectCreateInput {
  firstMessage: String!
  subject: String!
  tweetId: String
}

input ReplyOnSubjectInput {
  message: String!
  subjectId: ID!
}

type SubjectConnection {
  edges: [SubjectEdge!]!
  pageInfo: PageInfo!
}

input SubjectFilter {
  hasDisputes: Boolean
}

type Dispute {
  createdAt: DateTime!
  id: ID!
  lastMessageAt: DateTime!
  messages: [Message!]!
  partnerA: User!
  partnerB: User!
  subject: Subject!
}

type DisputeConnection {
  edges: [DisputeEdge!]!
  pageInfo: PageInfo!
}

input ReplyOnDisputInput {
  disputeId: ID!
  message: String!
}

type User {
  allDisputes(first: Int = 10, after: String, last: Int = 10, before: String): DisputeConnection!
  allSubjects(first: Int = 10, after: String, last: Int = 10, before: String): SubjectConnection!
  id: ID!
  name: String!
  picture: String
}

type NotificationStatus {
  totalCountUnread: Int!
}

type NotificationConnection {
  edges: [NotificationEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type NotificationsUpdate {
  notificationStatus: NotificationStatus!
  updatedNotification: [Notification!]!
}

type Message {
  author: User!
  createdAt: DateTime!
  dispute: Dispute!
  id: ID!
  text: String!
  votes: Votes!
}

enum UserVoting {
  UP
  DOWN
  NONE
}

type Tweet {
  id: ID!
}

type PageInfo {
  endCursor: String!
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String!
}

interface Notification {
  id: ID!
  read: Boolean!
  createdAt: DateTime!
}

type SubjectEdge {
  cursor: String!
  node: Subject!
}

type DisputeEdge {
  cursor: String!
  node: Dispute!
}

type NotificationEdge {
  cursor: String!
  node: Notification!
}

type Votes {
  ups: Int!
  downs: Int!
  userVoting: UserVoting!
}

type NewMessageNotification implements Notification {
  id: ID!
  read: Boolean!
  createdAt: DateTime!
  message: Message!
}

type NewDisputeNotification implements Notification {
  id: ID!
  read: Boolean!
  createdAt: DateTime!
  dispute: Dispute!
}
`;

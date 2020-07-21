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
export type FieldWrapper<T> = T | Promise<T> | (() => T | Promise<T>);
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
  allDisputes: FieldWrapper<DisputeConnection>;
  allNotifications?: FieldWrapper<Maybe<NotificationConnection>>;
  allSubjects: FieldWrapper<SubjectConnection>;
  chat?: FieldWrapper<Maybe<Chat>>;
  chatItem?: FieldWrapper<Maybe<ChatItem>>;
  dispute?: FieldWrapper<Maybe<Dispute>>;
  me?: FieldWrapper<Maybe<User>>;
  notificationStatus: FieldWrapper<NotificationStatus>;
  subject?: FieldWrapper<Maybe<Subject>>;
  twitterTimeline?: FieldWrapper<Maybe<Array<Tweet>>>;
  user?: FieldWrapper<Maybe<User>>;
};

export type QueryAllDisputesArgs = {
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type QueryAllNotificationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type QueryAllSubjectsArgs = {
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<SubjectFilter>;
};

export type QueryChatArgs = {
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['DateTime']>;
  before?: Maybe<Scalars['DateTime']>;
  search?: Maybe<Scalars['String']>;
  scope?: ChatScope;
};

export type QueryChatItemArgs = {
  id: Scalars['ID'];
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
  createSubject: FieldWrapper<Subject>;
  markMultipleNotificationAsRead: FieldWrapper<Array<Notification>>;
  markNotificationAsRead: FieldWrapper<Notification>;
  markNotificationsAsReadForDispute: FieldWrapper<NotificationsUpdate>;
  replyOnDispute: FieldWrapper<Dispute>;
  replyOnSubject: FieldWrapper<Dispute>;
  vote: FieldWrapper<Message>;
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

export type Subject = ChatItem & {
  __typename?: 'Subject';
  author: FieldWrapper<User>;
  createdAt: FieldWrapper<Scalars['DateTime']>;
  disputes: FieldWrapper<Array<Dispute>>;
  firstMessage: FieldWrapper<Message>;
  hasDisputes: FieldWrapper<Scalars['Boolean']>;
  id: FieldWrapper<Scalars['ID']>;
  lastUpdateAt: FieldWrapper<Scalars['DateTime']>;
  subject: FieldWrapper<Scalars['String']>;
  tweetId?: FieldWrapper<Maybe<Scalars['String']>>;
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
  edges: FieldWrapper<Array<SubjectEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type SubjectFilter = {
  hasDisputes?: Maybe<Scalars['Boolean']>;
};

export type Dispute = ChatItem & {
  __typename?: 'Dispute';
  createdAt: FieldWrapper<Scalars['DateTime']>;
  id: FieldWrapper<Scalars['ID']>;
  lastUpdateAt: FieldWrapper<Scalars['DateTime']>;
  messages: FieldWrapper<Array<Message>>;
  partnerA: FieldWrapper<User>;
  partnerB: FieldWrapper<User>;
  subject: FieldWrapper<Subject>;
};

export type DisputeConnection = {
  __typename?: 'DisputeConnection';
  edges: FieldWrapper<Array<DisputeEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
};

export type ReplyOnDisputInput = {
  disputeId: Scalars['ID'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  allDisputes: FieldWrapper<DisputeConnection>;
  allSubjects: FieldWrapper<SubjectConnection>;
  id: FieldWrapper<Scalars['ID']>;
  name: FieldWrapper<Scalars['String']>;
  picture?: FieldWrapper<Maybe<Scalars['String']>>;
  twitterHandle: FieldWrapper<Scalars['String']>;
};

export type UserAllDisputesArgs = {
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type UserAllSubjectsArgs = {
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type NotificationStatus = {
  __typename?: 'NotificationStatus';
  totalCountUnread: FieldWrapper<Scalars['Int']>;
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  edges: FieldWrapper<Array<NotificationEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars['Int']>;
};

export type NotificationsUpdate = {
  __typename?: 'NotificationsUpdate';
  notificationStatus: FieldWrapper<NotificationStatus>;
  updatedNotification: FieldWrapper<Array<Notification>>;
};

export type Message = {
  __typename?: 'Message';
  author: FieldWrapper<User>;
  createdAt: FieldWrapper<Scalars['DateTime']>;
  dispute: FieldWrapper<Dispute>;
  id: FieldWrapper<Scalars['ID']>;
  text: FieldWrapper<Scalars['String']>;
  votes: FieldWrapper<Votes>;
};

export enum UserVoting {
  Up = 'UP',
  Down = 'DOWN',
  None = 'NONE',
}

export type Tweet = {
  __typename?: 'Tweet';
  id: FieldWrapper<Scalars['ID']>;
  link: FieldWrapper<Scalars['String']>;
};

export type ChatItem = {
  id: FieldWrapper<Scalars['ID']>;
  lastUpdateAt: FieldWrapper<Scalars['DateTime']>;
};

export type Chat = {
  __typename?: 'Chat';
  hasNextPage: FieldWrapper<Scalars['Boolean']>;
  items: FieldWrapper<Array<ChatItem>>;
  newestLastUpdateAt?: FieldWrapper<Maybe<Scalars['DateTime']>>;
  oldestLastUpdateAt?: FieldWrapper<Maybe<Scalars['DateTime']>>;
};

export enum ChatScope {
  All = 'ALL',
  UserScope = 'USER_SCOPE',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: FieldWrapper<Scalars['String']>;
  hasNextPage: FieldWrapper<Scalars['Boolean']>;
  hasPreviousPage: FieldWrapper<Scalars['Boolean']>;
  startCursor: FieldWrapper<Scalars['String']>;
};

export type Notification = {
  id: FieldWrapper<Scalars['ID']>;
  read: FieldWrapper<Scalars['Boolean']>;
  createdAt: FieldWrapper<Scalars['DateTime']>;
};

export type SubjectEdge = {
  __typename?: 'SubjectEdge';
  cursor: FieldWrapper<Scalars['String']>;
  node: FieldWrapper<Subject>;
};

export type DisputeEdge = {
  __typename?: 'DisputeEdge';
  cursor: FieldWrapper<Scalars['String']>;
  node: FieldWrapper<Dispute>;
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: FieldWrapper<Scalars['String']>;
  node: FieldWrapper<Notification>;
};

export type Votes = {
  __typename?: 'Votes';
  ups: FieldWrapper<Scalars['Int']>;
  downs: FieldWrapper<Scalars['Int']>;
  userVoting: FieldWrapper<UserVoting>;
};

export type NewMessageNotification = Notification & {
  __typename?: 'NewMessageNotification';
  id: FieldWrapper<Scalars['ID']>;
  read: FieldWrapper<Scalars['Boolean']>;
  createdAt: FieldWrapper<Scalars['DateTime']>;
  message: FieldWrapper<Message>;
};

export type NewDisputeNotification = Notification & {
  __typename?: 'NewDisputeNotification';
  id: FieldWrapper<Scalars['ID']>;
  read: FieldWrapper<Scalars['Boolean']>;
  createdAt: FieldWrapper<Scalars['DateTime']>;
  dispute: FieldWrapper<Dispute>;
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
  ChatItem: ResolversTypes['Subject'] | ResolversTypes['Dispute'];
  Chat: ResolverTypeWrapper<Chat>;
  ChatScope: ChatScope;
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
  ChatItem: ResolversParentTypes['Subject'] | ResolversParentTypes['Dispute'];
  Chat: Chat;
  ChatScope: ChatScope;
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

export type ComplexityDirectiveArgs = {
  value: Scalars['Int'];
  multipliers?: Maybe<Array<Scalars['String']>>;
};

export type ComplexityDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = ComplexityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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
    RequireFields<QueryAllDisputesArgs, 'limit'>
  >;
  allNotifications?: Resolver<
    Maybe<ResolversTypes['NotificationConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllNotificationsArgs, 'limit'>
  >;
  allSubjects?: Resolver<
    ResolversTypes['SubjectConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryAllSubjectsArgs, 'limit'>
  >;
  chat?: Resolver<
    Maybe<ResolversTypes['Chat']>,
    ParentType,
    ContextType,
    RequireFields<QueryChatArgs, 'limit' | 'scope'>
  >;
  chatItem?: Resolver<
    Maybe<ResolversTypes['ChatItem']>,
    ParentType,
    ContextType,
    RequireFields<QueryChatItemArgs, 'id'>
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
  lastUpdateAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
  lastUpdateAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
    RequireFields<UserAllDisputesArgs, 'limit'>
  >;
  allSubjects?: Resolver<
    ResolversTypes['SubjectConnection'],
    ParentType,
    ContextType,
    RequireFields<UserAllSubjectsArgs, 'limit'>
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitterHandle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ChatItemResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ChatItem'] = ResolversParentTypes['ChatItem']
> = ResolversObject<{
  __resolveType: TypeResolveFn<'Subject' | 'Dispute', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastUpdateAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type ChatResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']
> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['ChatItem']>, ParentType, ContextType>;
  newestLastUpdateAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  oldestLastUpdateAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
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
  ChatItem?: ChatItemResolvers;
  Chat?: ChatResolvers<ContextType>;
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
  complexity?: ComplexityDirectiveResolver<any, any, ContextType>;
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
directive @complexity(value: Int!, multipliers: [String!]) on FIELD_DEFINITION

directive @auth on FIELD_DEFINITION

scalar DateTime

type Query {
  allDisputes(limit: Int = 10, after: String, before: String): DisputeConnection! @complexity(value: 1, multipliers: ["limit"])
  allNotifications(limit: Int = 10, after: String, before: String): NotificationConnection
  allSubjects(limit: Int = 10, after: String, before: String, filter: SubjectFilter): SubjectConnection! @complexity(value: 1, multipliers: ["limit"])
  chat(limit: Int = 10, after: DateTime, before: DateTime, search: String, scope: ChatScope! = USER_SCOPE): Chat @complexity(value: 1, multipliers: ["limit"])
  chatItem(id: ID!): ChatItem
  dispute(id: ID!): Dispute
  me: User
  notificationStatus: NotificationStatus! @auth
  subject(id: ID!): Subject
  twitterTimeline: [Tweet!]
  user(id: ID!): User
}

type Mutation {
  createSubject(input: SubjectCreateInput!): Subject! @auth
  markMultipleNotificationAsRead(latestId: ID!): [Notification!]! @auth
  markNotificationAsRead(id: ID!): Notification! @auth
  markNotificationsAsReadForDispute(disputeId: ID!): NotificationsUpdate! @auth
  replyOnDispute(input: ReplyOnDisputInput!): Dispute! @auth
  replyOnSubject(input: ReplyOnSubjectInput!): Dispute! @auth
  vote(messageId: ID!, voting: UserVoting!): Message! @auth
}

type Subject implements ChatItem {
  author: User!
  createdAt: DateTime!
  disputes: [Dispute!]!
  firstMessage: Message!
  hasDisputes: Boolean!
  id: ID!
  lastUpdateAt: DateTime!
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

type Dispute implements ChatItem {
  createdAt: DateTime!
  id: ID!
  lastUpdateAt: DateTime!
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
  allDisputes(limit: Int = 10, after: String, before: String): DisputeConnection! @complexity(value: 1, multipliers: ["limit"])
  allSubjects(limit: Int = 10, after: String, before: String): SubjectConnection! @complexity(value: 1, multipliers: ["limit"])
  id: ID!
  name: String!
  picture: String
  twitterHandle: String!
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
  notificationStatus: NotificationStatus! @auth
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
  link: String!
}

interface ChatItem {
  id: ID!
  lastUpdateAt: DateTime!
}

type Chat {
  hasNextPage: Boolean!
  items: [ChatItem!]!
  newestLastUpdateAt: DateTime
  oldestLastUpdateAt: DateTime
}

enum ChatScope {
  ALL
  USER_SCOPE
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

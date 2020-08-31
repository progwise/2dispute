/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { SubjectDocument } from '../Subject/SubjectSchema';
import { DisputeDocument } from '../Dispute/DisputeSchema';
import { MessageDocument } from '../Message/MessageSchema';
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
  allSubjects: FieldWrapper<SubjectConnection>;
  chat?: FieldWrapper<Maybe<ChatConnection>>;
  chatItem?: FieldWrapper<Maybe<ChatItem>>;
  dispute?: FieldWrapper<Maybe<Dispute>>;
  me?: FieldWrapper<Maybe<User>>;
  subject?: FieldWrapper<Maybe<Subject>>;
  twitterTimeline?: FieldWrapper<Maybe<TweetConnection>>;
  user?: FieldWrapper<Maybe<User>>;
};

export type QueryAllDisputesArgs = {
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

export type QueryTwitterTimelineArgs = {
  after?: Maybe<Scalars['String']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubject: FieldWrapper<Subject>;
  editMessage: FieldWrapper<Array<Message>>;
  editSubjectTitle: FieldWrapper<Subject>;
  replyOnDispute: FieldWrapper<Dispute>;
  replyOnSubject: FieldWrapper<Dispute>;
  vote: FieldWrapper<Message>;
};

export type MutationCreateSubjectArgs = {
  input: SubjectCreateInput;
};

export type MutationEditMessageArgs = {
  messageId: Scalars['ID'];
  text: Scalars['String'];
};

export type MutationEditSubjectTitleArgs = {
  subjectId: Scalars['ID'];
  title: Scalars['String'];
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
  name?: FieldWrapper<Maybe<Scalars['String']>>;
  picture?: FieldWrapper<Maybe<Scalars['String']>>;
  twitterHandle?: FieldWrapper<Maybe<Scalars['String']>>;
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

export type ChatConnection = {
  __typename?: 'ChatConnection';
  edges: FieldWrapper<Array<ChatEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
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

export type TweetConnection = {
  __typename?: 'TweetConnection';
  pageInfo: FieldWrapper<PageInfo>;
  edges: FieldWrapper<Array<TweetEdge>>;
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

export type Votes = {
  __typename?: 'Votes';
  ups: FieldWrapper<Scalars['Int']>;
  downs: FieldWrapper<Scalars['Int']>;
  userVoting: FieldWrapper<UserVoting>;
};

export type ChatEdge = {
  __typename?: 'ChatEdge';
  cursor: FieldWrapper<Scalars['String']>;
  node: FieldWrapper<ChatItem>;
};

export type TweetEdge = {
  __typename?: 'TweetEdge';
  cursor: FieldWrapper<Scalars['String']>;
  node: FieldWrapper<Tweet>;
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
  Message: ResolverTypeWrapper<MessageDocument>;
  UserVoting: UserVoting;
  Tweet: ResolverTypeWrapper<Tweet>;
  ChatItem: ResolversTypes['Subject'] | ResolversTypes['Dispute'];
  ChatConnection: ResolverTypeWrapper<ChatConnection>;
  ChatScope: ChatScope;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  TweetConnection: ResolverTypeWrapper<TweetConnection>;
  SubjectEdge: ResolverTypeWrapper<
    Omit<SubjectEdge, 'node'> & { node: ResolversTypes['Subject'] }
  >;
  DisputeEdge: ResolverTypeWrapper<
    Omit<DisputeEdge, 'node'> & { node: ResolversTypes['Dispute'] }
  >;
  Votes: ResolverTypeWrapper<Votes>;
  ChatEdge: ResolverTypeWrapper<ChatEdge>;
  TweetEdge: ResolverTypeWrapper<TweetEdge>;
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
  Message: MessageDocument;
  UserVoting: UserVoting;
  Tweet: Tweet;
  ChatItem: ResolversParentTypes['Subject'] | ResolversParentTypes['Dispute'];
  ChatConnection: ChatConnection;
  ChatScope: ChatScope;
  PageInfo: PageInfo;
  TweetConnection: TweetConnection;
  SubjectEdge: Omit<SubjectEdge, 'node'> & {
    node: ResolversParentTypes['Subject'];
  };
  DisputeEdge: Omit<DisputeEdge, 'node'> & {
    node: ResolversParentTypes['Dispute'];
  };
  Votes: Votes;
  ChatEdge: ChatEdge;
  TweetEdge: TweetEdge;
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
  allSubjects?: Resolver<
    ResolversTypes['SubjectConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryAllSubjectsArgs, 'limit'>
  >;
  chat?: Resolver<
    Maybe<ResolversTypes['ChatConnection']>,
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
  subject?: Resolver<
    Maybe<ResolversTypes['Subject']>,
    ParentType,
    ContextType,
    RequireFields<QuerySubjectArgs, 'id'>
  >;
  twitterTimeline?: Resolver<
    Maybe<ResolversTypes['TweetConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryTwitterTimelineArgs, never>
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
  editMessage?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditMessageArgs, 'messageId' | 'text'>
  >;
  editSubjectTitle?: Resolver<
    ResolversTypes['Subject'],
    ParentType,
    ContextType,
    RequireFields<MutationEditSubjectTitleArgs, 'subjectId' | 'title'>
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
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitterHandle?: Resolver<
    Maybe<ResolversTypes['String']>,
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

export type ChatConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ChatConnection'] = ResolversParentTypes['ChatConnection']
> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['ChatEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
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

export type TweetConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['TweetConnection'] = ResolversParentTypes['TweetConnection']
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['TweetEdge']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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

export type VotesResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Votes'] = ResolversParentTypes['Votes']
> = ResolversObject<{
  ups?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  downs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userVoting?: Resolver<ResolversTypes['UserVoting'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ChatEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ChatEdge'] = ResolversParentTypes['ChatEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ChatItem'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TweetEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['TweetEdge'] = ResolversParentTypes['TweetEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType>;
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
  Message?: MessageResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  ChatItem?: ChatItemResolvers;
  ChatConnection?: ChatConnectionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  TweetConnection?: TweetConnectionResolvers<ContextType>;
  SubjectEdge?: SubjectEdgeResolvers<ContextType>;
  DisputeEdge?: DisputeEdgeResolvers<ContextType>;
  Votes?: VotesResolvers<ContextType>;
  ChatEdge?: ChatEdgeResolvers<ContextType>;
  TweetEdge?: TweetEdgeResolvers<ContextType>;
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
  allSubjects(limit: Int = 10, after: String, before: String, filter: SubjectFilter): SubjectConnection! @complexity(value: 1, multipliers: ["limit"])
  chat(limit: Int = 10, after: DateTime, before: DateTime, search: String, scope: ChatScope! = USER_SCOPE): ChatConnection @complexity(value: 1, multipliers: ["limit"])
  chatItem(id: ID!): ChatItem
  dispute(id: ID!): Dispute
  me: User
  subject(id: ID!): Subject
  twitterTimeline(after: String): TweetConnection
  user(id: ID!): User
}

type Mutation {
  createSubject(input: SubjectCreateInput!): Subject! @auth
  editMessage(messageId: ID!, text: String!): [Message!]! @auth
  editSubjectTitle(subjectId: ID!, title: String!): Subject! @auth
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
  name: String
  picture: String
  twitterHandle: String
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

type ChatConnection {
  edges: [ChatEdge!]!
  pageInfo: PageInfo!
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

type TweetConnection {
  pageInfo: PageInfo!
  edges: [TweetEdge!]!
}

type SubjectEdge {
  cursor: String!
  node: Subject!
}

type DisputeEdge {
  cursor: String!
  node: Dispute!
}

type Votes {
  ups: Int!
  downs: Int!
  userVoting: UserVoting!
}

type ChatEdge {
  cursor: String!
  node: ChatItem!
}

type TweetEdge {
  cursor: String!
  node: Tweet!
}
`;

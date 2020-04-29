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
import { gql } from 'apollo-boost';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
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
  allSubjects: SubjectConnection;
  dispute?: Maybe<Dispute>;
  me?: Maybe<User>;
  subject?: Maybe<Subject>;
  user?: Maybe<User>;
};

export type QueryAllDisputesArgs = {
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
  replyOnDispute: Dispute;
  replyOnSubject: Dispute;
};

export type MutationCreateSubjectArgs = {
  input: SubjectCreateInput;
};

export type MutationReplyOnDisputeArgs = {
  input: ReplyOnDisputInput;
};

export type MutationReplyOnSubjectArgs = {
  input: ReplyOnSubjectInput;
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

export type Message = {
  __typename?: 'Message';
  author: User;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
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
  PageInfo: ResolverTypeWrapper<PageInfo>;
  SubjectEdge: ResolverTypeWrapper<
    Omit<SubjectEdge, 'node'> & { node: ResolversTypes['Subject'] }
  >;
  DisputeEdge: ResolverTypeWrapper<
    Omit<DisputeEdge, 'node'> & { node: ResolversTypes['Dispute'] }
  >;
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
  PageInfo: PageInfo;
  SubjectEdge: Omit<SubjectEdge, 'node'> & {
    node: ResolversParentTypes['Subject'];
  };
  DisputeEdge: Omit<DisputeEdge, 'node'> & {
    node: ResolversParentTypes['Dispute'];
  };
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
  subject?: Resolver<
    Maybe<ResolversTypes['Subject']>,
    ParentType,
    ContextType,
    RequireFields<QuerySubjectArgs, 'id'>
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

export type MessageResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  PageInfo?: PageInfoResolvers<ContextType>;
  SubjectEdge?: SubjectEdgeResolvers<ContextType>;
  DisputeEdge?: DisputeEdgeResolvers<ContextType>;
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
export type ChatSubjectFragment = { __typename?: 'Subject' } & Pick<
  Subject,
  'id' | 'createdAt'
> & {
    author: { __typename?: 'User' } & ChatPersonFragment;
    firstMessage: { __typename?: 'Message' } & ChatMessageFragment;
  };

export type ChatDisputeFragment = { __typename?: 'Dispute' } & Pick<
  Dispute,
  'id'
> & {
    partnerA: { __typename?: 'User' } & ChatPersonFragment;
    partnerB: { __typename?: 'User' } & ChatPersonFragment;
    messages: Array<{ __typename?: 'Message' } & ChatMessageFragment>;
  };

export type ChatMessageFragment = { __typename?: 'Message' } & Pick<
  Message,
  'id' | 'text' | 'createdAt'
> & { author: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture'> };

export type ChatPersonFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'picture'
>;

export type HeaderMeQueryVariables = {};

export type HeaderMeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>;
};

export type UserInfoFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'picture'
> & {
    allDisputes: { __typename?: 'DisputeConnection' } & {
      edges: Array<
        { __typename?: 'DisputeEdge' } & {
          node: { __typename?: 'Dispute' } & Pick<Dispute, 'id'> & {
              partnerA: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
              partnerB: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
              subject: { __typename?: 'Subject' } & Pick<
                Subject,
                'id' | 'subject'
              >;
            };
        }
      >;
    };
    allSubjects: { __typename?: 'SubjectConnection' } & {
      edges: Array<
        { __typename?: 'SubjectEdge' } & {
          node: { __typename?: 'Subject' } & Pick<Subject, 'id' | 'subject'>;
        }
      >;
    };
  };

export type GetUserInfoByIdQueryVariables = {
  userId: Scalars['ID'];
};

export type GetUserInfoByIdQuery = { __typename?: 'Query' } & {
  user?: Maybe<{ __typename?: 'User' } & UserInfoFragment>;
};

export type GetAllDisputesQueryVariables = {
  cursor?: Maybe<Scalars['String']>;
};

export type GetAllDisputesQuery = { __typename?: 'Query' } & {
  allDisputes: { __typename?: 'DisputeConnection' } & {
    edges: Array<
      { __typename?: 'DisputeEdge' } & {
        node: { __typename?: 'Dispute' } & Pick<
          Dispute,
          'id' | 'lastMessageAt'
        > & {
            subject: { __typename?: 'Subject' } & Pick<
              Subject,
              'id' | 'subject'
            >;
            partnerA: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
            partnerB: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
          };
      }
    >;
    pageInfo: { __typename?: 'PageInfo' } & Pick<
      PageInfo,
      'endCursor' | 'hasNextPage'
    >;
  };
};

export type GetDisputeQueryVariables = {
  disputeId: Scalars['ID'];
};

export type GetDisputeQuery = { __typename?: 'Query' } & {
  dispute?: Maybe<
    { __typename?: 'Dispute' } & Pick<Dispute, 'id'> & {
        subject: { __typename?: 'Subject' } & Pick<
          Subject,
          'id' | 'subject' | 'tweetId'
        > & {
            disputes: Array<
              { __typename?: 'Dispute' } & Pick<Dispute, 'id'> & {
                  partnerA: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
                  partnerB: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
                }
            >;
          };
      } & ChatDisputeFragment
  >;
  me?: Maybe<{ __typename?: 'User' } & ChatPersonFragment>;
};

export type ReplyOnDisputeMutationVariables = {
  disputeId: Scalars['ID'];
  message: Scalars['String'];
};

export type ReplyOnDisputeMutation = { __typename?: 'Mutation' } & {
  replyOnDispute: { __typename?: 'Dispute' } & Pick<Dispute, 'id'> & {
      messages: Array<
        { __typename?: 'Message' } & Pick<Message, 'id' | 'text'> & {
            author: { __typename?: 'User' } & Pick<User, 'id'>;
          }
      >;
    };
};

export type StartPageQueryVariables = {};

export type StartPageQuery = { __typename?: 'Query' } & {
  latestActiveDisputes: { __typename?: 'DisputeConnection' } & {
    edges: Array<
      { __typename?: 'DisputeEdge' } & {
        node: { __typename?: 'Dispute' } & Pick<
          Dispute,
          'id' | 'lastMessageAt'
        > & {
            partnerA: { __typename?: 'User' } & StartPageUserFragment;
            partnerB: { __typename?: 'User' } & StartPageUserFragment;
            subject: { __typename?: 'Subject' } & Pick<
              Subject,
              'id' | 'subject'
            >;
          };
      }
    >;
  };
  unansweredSubjects: { __typename?: 'SubjectConnection' } & {
    edges: Array<
      { __typename?: 'SubjectEdge' } & {
        node: { __typename?: 'Subject' } & Pick<
          Subject,
          'id' | 'subject' | 'hasDisputes' | 'createdAt'
        > & { author: { __typename?: 'User' } & StartPageUserFragment };
      }
    >;
  };
};

export type StartPageUserFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name'
>;

export type MeQueryVariables = {};

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture'>>;
};

export type CreateSubjectMutationVariables = {
  subject: Scalars['String'];
  tweetId?: Maybe<Scalars['String']>;
  firstMessage: Scalars['String'];
};

export type CreateSubjectMutation = { __typename?: 'Mutation' } & {
  createSubject: { __typename?: 'Subject' } & Pick<
    Subject,
    'id' | 'subject' | 'tweetId'
  >;
};

export type GetAllSubjectsQueryVariables = {
  cursor?: Maybe<Scalars['String']>;
};

export type GetAllSubjectsQuery = { __typename?: 'Query' } & {
  allSubjects: { __typename?: 'SubjectConnection' } & {
    edges: Array<
      { __typename?: 'SubjectEdge' } & {
        node: { __typename?: 'Subject' } & Pick<Subject, 'id' | 'subject'> & {
            author: { __typename?: 'User' } & Pick<User, 'name'>;
            disputes: Array<
              { __typename?: 'Dispute' } & Pick<Dispute, 'id'> & {
                  partnerB: { __typename?: 'User' } & Pick<User, 'name'>;
                }
            >;
          };
      }
    >;
    pageInfo: { __typename?: 'PageInfo' } & Pick<
      PageInfo,
      'hasNextPage' | 'endCursor'
    >;
  };
};

export type GetSubjectQueryVariables = {
  subjectId: Scalars['ID'];
};

export type GetSubjectQuery = { __typename?: 'Query' } & {
  subject?: Maybe<
    { __typename?: 'Subject' } & Pick<Subject, 'id' | 'subject' | 'tweetId'> & {
        disputes: Array<
          { __typename?: 'Dispute' } & Pick<Dispute, 'id'> & {
              partnerB: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
            }
        >;
      } & ChatSubjectFragment
  >;
  me?: Maybe<{ __typename?: 'User' } & ChatPersonFragment>;
};

export type ReplyOnSubjectMutationVariables = {
  subjectId: Scalars['ID'];
  message: Scalars['String'];
};

export type ReplyOnSubjectMutation = { __typename?: 'Mutation' } & {
  replyOnSubject: { __typename?: 'Dispute' } & Pick<Dispute, 'id'>;
};

export const ChatPersonFragmentDoc = gql`
  fragment ChatPerson on User {
    id
    name
    picture
  }
`;
export const ChatMessageFragmentDoc = gql`
  fragment ChatMessage on Message {
    id
    text
    createdAt
    author {
      id
      name
      picture
    }
  }
`;
export const ChatSubjectFragmentDoc = gql`
  fragment ChatSubject on Subject {
    id
    author {
      ...ChatPerson
    }
    firstMessage {
      ...ChatMessage
    }
    createdAt
  }
  ${ChatPersonFragmentDoc}
  ${ChatMessageFragmentDoc}
`;
export const ChatDisputeFragmentDoc = gql`
  fragment ChatDispute on Dispute {
    id
    partnerA {
      ...ChatPerson
    }
    partnerB {
      ...ChatPerson
    }
    messages {
      ...ChatMessage
    }
  }
  ${ChatPersonFragmentDoc}
  ${ChatMessageFragmentDoc}
`;
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    name
    picture
    allDisputes(first: 10) {
      edges {
        node {
          id
          partnerA {
            id
            name
          }
          partnerB {
            id
            name
          }
          subject {
            id
            subject
          }
        }
      }
    }
    allSubjects(first: 10) {
      edges {
        node {
          id
          subject
        }
      }
    }
  }
`;
export const StartPageUserFragmentDoc = gql`
  fragment StartPageUser on User {
    id
    name
  }
`;
export const HeaderMeDocument = gql`
  query headerMe {
    me {
      id
      name
    }
  }
`;

/**
 * __useHeaderMeQuery__
 *
 * To run a query within a React component, call `useHeaderMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeaderMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeaderMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useHeaderMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    HeaderMeQuery,
    HeaderMeQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<HeaderMeQuery, HeaderMeQueryVariables>(
    HeaderMeDocument,
    baseOptions,
  );
}
export function useHeaderMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HeaderMeQuery,
    HeaderMeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<HeaderMeQuery, HeaderMeQueryVariables>(
    HeaderMeDocument,
    baseOptions,
  );
}
export type HeaderMeQueryHookResult = ReturnType<typeof useHeaderMeQuery>;
export type HeaderMeLazyQueryHookResult = ReturnType<
  typeof useHeaderMeLazyQuery
>;
export type HeaderMeQueryResult = ApolloReactCommon.QueryResult<
  HeaderMeQuery,
  HeaderMeQueryVariables
>;
export const GetUserInfoByIdDocument = gql`
  query getUserInfoById($userId: ID!) {
    user(id: $userId) {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useGetUserInfoByIdQuery__
 *
 * To run a query within a React component, call `useGetUserInfoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserInfoByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserInfoByIdQuery,
    GetUserInfoByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetUserInfoByIdQuery,
    GetUserInfoByIdQueryVariables
  >(GetUserInfoByIdDocument, baseOptions);
}
export function useGetUserInfoByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserInfoByIdQuery,
    GetUserInfoByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetUserInfoByIdQuery,
    GetUserInfoByIdQueryVariables
  >(GetUserInfoByIdDocument, baseOptions);
}
export type GetUserInfoByIdQueryHookResult = ReturnType<
  typeof useGetUserInfoByIdQuery
>;
export type GetUserInfoByIdLazyQueryHookResult = ReturnType<
  typeof useGetUserInfoByIdLazyQuery
>;
export type GetUserInfoByIdQueryResult = ApolloReactCommon.QueryResult<
  GetUserInfoByIdQuery,
  GetUserInfoByIdQueryVariables
>;
export const GetAllDisputesDocument = gql`
  query getAllDisputes($cursor: String) {
    allDisputes(first: 20, after: $cursor) {
      edges {
        node {
          id
          lastMessageAt
          subject {
            id
            subject
          }
          partnerA {
            id
            name
          }
          partnerB {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

/**
 * __useGetAllDisputesQuery__
 *
 * To run a query within a React component, call `useGetAllDisputesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDisputesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDisputesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllDisputesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllDisputesQuery,
    GetAllDisputesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetAllDisputesQuery,
    GetAllDisputesQueryVariables
  >(GetAllDisputesDocument, baseOptions);
}
export function useGetAllDisputesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllDisputesQuery,
    GetAllDisputesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllDisputesQuery,
    GetAllDisputesQueryVariables
  >(GetAllDisputesDocument, baseOptions);
}
export type GetAllDisputesQueryHookResult = ReturnType<
  typeof useGetAllDisputesQuery
>;
export type GetAllDisputesLazyQueryHookResult = ReturnType<
  typeof useGetAllDisputesLazyQuery
>;
export type GetAllDisputesQueryResult = ApolloReactCommon.QueryResult<
  GetAllDisputesQuery,
  GetAllDisputesQueryVariables
>;
export const GetDisputeDocument = gql`
  query getDispute($disputeId: ID!) {
    dispute(id: $disputeId) {
      id
      subject {
        id
        subject
        tweetId
        disputes {
          id
          partnerA {
            id
            name
          }
          partnerB {
            id
            name
          }
        }
      }
      ...ChatDispute
    }
    me {
      ...ChatPerson
    }
  }
  ${ChatDisputeFragmentDoc}
  ${ChatPersonFragmentDoc}
`;

/**
 * __useGetDisputeQuery__
 *
 * To run a query within a React component, call `useGetDisputeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDisputeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDisputeQuery({
 *   variables: {
 *      disputeId: // value for 'disputeId'
 *   },
 * });
 */
export function useGetDisputeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetDisputeQuery,
    GetDisputeQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetDisputeQuery, GetDisputeQueryVariables>(
    GetDisputeDocument,
    baseOptions,
  );
}
export function useGetDisputeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDisputeQuery,
    GetDisputeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetDisputeQuery,
    GetDisputeQueryVariables
  >(GetDisputeDocument, baseOptions);
}
export type GetDisputeQueryHookResult = ReturnType<typeof useGetDisputeQuery>;
export type GetDisputeLazyQueryHookResult = ReturnType<
  typeof useGetDisputeLazyQuery
>;
export type GetDisputeQueryResult = ApolloReactCommon.QueryResult<
  GetDisputeQuery,
  GetDisputeQueryVariables
>;
export const ReplyOnDisputeDocument = gql`
  mutation replyOnDispute($disputeId: ID!, $message: String!) {
    replyOnDispute(input: { disputeId: $disputeId, message: $message }) {
      id
      messages {
        id
        author {
          id
        }
        text
      }
    }
  }
`;
export type ReplyOnDisputeMutationFn = ApolloReactCommon.MutationFunction<
  ReplyOnDisputeMutation,
  ReplyOnDisputeMutationVariables
>;

/**
 * __useReplyOnDisputeMutation__
 *
 * To run a mutation, you first call `useReplyOnDisputeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyOnDisputeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyOnDisputeMutation, { data, loading, error }] = useReplyOnDisputeMutation({
 *   variables: {
 *      disputeId: // value for 'disputeId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useReplyOnDisputeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ReplyOnDisputeMutation,
    ReplyOnDisputeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ReplyOnDisputeMutation,
    ReplyOnDisputeMutationVariables
  >(ReplyOnDisputeDocument, baseOptions);
}
export type ReplyOnDisputeMutationHookResult = ReturnType<
  typeof useReplyOnDisputeMutation
>;
export type ReplyOnDisputeMutationResult = ApolloReactCommon.MutationResult<
  ReplyOnDisputeMutation
>;
export type ReplyOnDisputeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ReplyOnDisputeMutation,
  ReplyOnDisputeMutationVariables
>;
export const StartPageDocument = gql`
  query StartPage {
    latestActiveDisputes: allDisputes(first: 10) {
      edges {
        node {
          id
          lastMessageAt
          partnerA {
            ...StartPageUser
          }
          partnerB {
            ...StartPageUser
          }
          subject {
            id
            subject
          }
        }
      }
    }
    unansweredSubjects: allSubjects(first: 10, filter: { hasDisputes: false }) {
      edges {
        node {
          id
          subject
          hasDisputes
          author {
            ...StartPageUser
          }
          createdAt
        }
      }
    }
  }
  ${StartPageUserFragmentDoc}
`;

/**
 * __useStartPageQuery__
 *
 * To run a query within a React component, call `useStartPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useStartPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStartPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useStartPageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    StartPageQuery,
    StartPageQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<StartPageQuery, StartPageQueryVariables>(
    StartPageDocument,
    baseOptions,
  );
}
export function useStartPageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    StartPageQuery,
    StartPageQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<StartPageQuery, StartPageQueryVariables>(
    StartPageDocument,
    baseOptions,
  );
}
export type StartPageQueryHookResult = ReturnType<typeof useStartPageQuery>;
export type StartPageLazyQueryHookResult = ReturnType<
  typeof useStartPageLazyQuery
>;
export type StartPageQueryResult = ApolloReactCommon.QueryResult<
  StartPageQuery,
  StartPageQueryVariables
>;
export const MeDocument = gql`
  query me {
    me {
      id
      name
      picture
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  );
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeQuery,
    MeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>;
export const CreateSubjectDocument = gql`
  mutation createSubject(
    $subject: String!
    $tweetId: String
    $firstMessage: String!
  ) {
    createSubject(
      input: {
        subject: $subject
        tweetId: $tweetId
        firstMessage: $firstMessage
      }
    ) {
      id
      subject
      tweetId
    }
  }
`;
export type CreateSubjectMutationFn = ApolloReactCommon.MutationFunction<
  CreateSubjectMutation,
  CreateSubjectMutationVariables
>;

/**
 * __useCreateSubjectMutation__
 *
 * To run a mutation, you first call `useCreateSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubjectMutation, { data, loading, error }] = useCreateSubjectMutation({
 *   variables: {
 *      subject: // value for 'subject'
 *      tweetId: // value for 'tweetId'
 *      firstMessage: // value for 'firstMessage'
 *   },
 * });
 */
export function useCreateSubjectMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateSubjectMutation,
    CreateSubjectMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateSubjectMutation,
    CreateSubjectMutationVariables
  >(CreateSubjectDocument, baseOptions);
}
export type CreateSubjectMutationHookResult = ReturnType<
  typeof useCreateSubjectMutation
>;
export type CreateSubjectMutationResult = ApolloReactCommon.MutationResult<
  CreateSubjectMutation
>;
export type CreateSubjectMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateSubjectMutation,
  CreateSubjectMutationVariables
>;
export const GetAllSubjectsDocument = gql`
  query getAllSubjects($cursor: String) {
    allSubjects(first: 20, after: $cursor) {
      edges {
        node {
          id
          subject
          author {
            name
          }
          disputes {
            id
            partnerB {
              name
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/**
 * __useGetAllSubjectsQuery__
 *
 * To run a query within a React component, call `useGetAllSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSubjectsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllSubjectsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllSubjectsQuery,
    GetAllSubjectsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetAllSubjectsQuery,
    GetAllSubjectsQueryVariables
  >(GetAllSubjectsDocument, baseOptions);
}
export function useGetAllSubjectsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllSubjectsQuery,
    GetAllSubjectsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllSubjectsQuery,
    GetAllSubjectsQueryVariables
  >(GetAllSubjectsDocument, baseOptions);
}
export type GetAllSubjectsQueryHookResult = ReturnType<
  typeof useGetAllSubjectsQuery
>;
export type GetAllSubjectsLazyQueryHookResult = ReturnType<
  typeof useGetAllSubjectsLazyQuery
>;
export type GetAllSubjectsQueryResult = ApolloReactCommon.QueryResult<
  GetAllSubjectsQuery,
  GetAllSubjectsQueryVariables
>;
export const GetSubjectDocument = gql`
  query getSubject($subjectId: ID!) {
    subject(id: $subjectId) {
      id
      subject
      tweetId
      ...ChatSubject
      disputes {
        id
        partnerB {
          id
          name
        }
      }
    }
    me {
      ...ChatPerson
    }
  }
  ${ChatSubjectFragmentDoc}
  ${ChatPersonFragmentDoc}
`;

/**
 * __useGetSubjectQuery__
 *
 * To run a query within a React component, call `useGetSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectQuery({
 *   variables: {
 *      subjectId: // value for 'subjectId'
 *   },
 * });
 */
export function useGetSubjectQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetSubjectQuery,
    GetSubjectQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetSubjectQuery, GetSubjectQueryVariables>(
    GetSubjectDocument,
    baseOptions,
  );
}
export function useGetSubjectLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetSubjectQuery,
    GetSubjectQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetSubjectQuery,
    GetSubjectQueryVariables
  >(GetSubjectDocument, baseOptions);
}
export type GetSubjectQueryHookResult = ReturnType<typeof useGetSubjectQuery>;
export type GetSubjectLazyQueryHookResult = ReturnType<
  typeof useGetSubjectLazyQuery
>;
export type GetSubjectQueryResult = ApolloReactCommon.QueryResult<
  GetSubjectQuery,
  GetSubjectQueryVariables
>;
export const ReplyOnSubjectDocument = gql`
  mutation replyOnSubject($subjectId: ID!, $message: String!) {
    replyOnSubject(input: { subjectId: $subjectId, message: $message }) {
      id
    }
  }
`;
export type ReplyOnSubjectMutationFn = ApolloReactCommon.MutationFunction<
  ReplyOnSubjectMutation,
  ReplyOnSubjectMutationVariables
>;

/**
 * __useReplyOnSubjectMutation__
 *
 * To run a mutation, you first call `useReplyOnSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyOnSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyOnSubjectMutation, { data, loading, error }] = useReplyOnSubjectMutation({
 *   variables: {
 *      subjectId: // value for 'subjectId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useReplyOnSubjectMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ReplyOnSubjectMutation,
    ReplyOnSubjectMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ReplyOnSubjectMutation,
    ReplyOnSubjectMutationVariables
  >(ReplyOnSubjectDocument, baseOptions);
}
export type ReplyOnSubjectMutationHookResult = ReturnType<
  typeof useReplyOnSubjectMutation
>;
export type ReplyOnSubjectMutationResult = ApolloReactCommon.MutationResult<
  ReplyOnSubjectMutation
>;
export type ReplyOnSubjectMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ReplyOnSubjectMutation,
  ReplyOnSubjectMutationVariables
>;

export const typeDefs = `
directive @auth on FIELD_DEFINITION

scalar DateTime

type Query {
  allDisputes(first: Int = 10, after: String, last: Int = 10, before: String): DisputeConnection!
  allSubjects(first: Int = 10, after: String, last: Int = 10, before: String, filter: SubjectFilter): SubjectConnection!
  dispute(id: ID!): Dispute
  me: User
  subject(id: ID!): Subject
  user(id: ID!): User
}

type Mutation {
  createSubject(input: SubjectCreateInput!): Subject!
  replyOnDispute(input: ReplyOnDisputInput!): Dispute!
  replyOnSubject(input: ReplyOnSubjectInput!): Dispute!
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

type Message {
  author: User!
  createdAt: DateTime!
  id: ID!
  text: String!
}

type PageInfo {
  endCursor: String!
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String!
}

type SubjectEdge {
  cursor: String!
  node: Subject!
}

type DisputeEdge {
  cursor: String!
  node: Dispute!
}
`;

/* eslint-disable */
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;

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
  chat?: Maybe<ChatConnection>;
  chatItem?: Maybe<ChatItem>;
  dispute?: Maybe<Dispute>;
  me?: Maybe<User>;
  subject?: Maybe<Subject>;
  twitterTimeline?: Maybe<TweetConnection>;
  user?: Maybe<User>;
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
  createSubject: Subject;
  editMessage: Array<Message>;
  editSubjectTitle: Subject;
  replyOnDispute: Dispute;
  replyOnSubject: Dispute;
  vote: Message;
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
  author: User;
  createdAt: Scalars['DateTime'];
  disputes: Array<Dispute>;
  firstMessage: Message;
  hasDisputes: Scalars['Boolean'];
  id: Scalars['ID'];
  lastUpdateAt: Scalars['DateTime'];
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

export type Dispute = ChatItem & {
  __typename?: 'Dispute';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  lastUpdateAt: Scalars['DateTime'];
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
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
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
  link: Scalars['String'];
};

export type ChatItem = {
  id: Scalars['ID'];
  lastUpdateAt: Scalars['DateTime'];
};

export type ChatConnection = {
  __typename?: 'ChatConnection';
  edges: Array<ChatEdge>;
  pageInfo: PageInfo;
};

export enum ChatScope {
  All = 'ALL',
  UserScope = 'USER_SCOPE',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type TweetConnection = {
  __typename?: 'TweetConnection';
  pageInfo: PageInfo;
  edges: Array<TweetEdge>;
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

export type Votes = {
  __typename?: 'Votes';
  ups: Scalars['Int'];
  downs: Scalars['Int'];
  userVoting: UserVoting;
};

export type ChatEdge = {
  __typename?: 'ChatEdge';
  cursor: Scalars['String'];
  node: ChatItem;
};

export type TweetEdge = {
  __typename?: 'TweetEdge';
  cursor: Scalars['String'];
  node: Tweet;
};

export type VoteMutationVariables = {
  messageId: Scalars['ID'];
  voting: UserVoting;
};

export type VoteMutation = { __typename?: 'Mutation' } & {
  vote: { __typename?: 'Message' } & Pick<Message, 'id'> & {
      votes: { __typename?: 'Votes' } & MessageVotesFragment;
    };
};

export type EditMessageMutationVariables = {
  messageId: Scalars['ID'];
  text: Scalars['String'];
};

export type EditMessageMutation = { __typename?: 'Mutation' } & {
  editMessage: Array<{ __typename?: 'Message' } & Pick<Message, 'id' | 'text'>>;
};

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
> & {
    author: { __typename?: 'User' } & ChatPersonFragment;
    votes: { __typename?: 'Votes' } & MessageVotesFragment;
  };

export type ChatPersonFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'twitterHandle' | 'picture'
>;

export type MessageVotesFragment = { __typename?: 'Votes' } & Pick<
  Votes,
  'ups' | 'downs' | 'userVoting'
>;

export type ChatItemHeaderQueryVariables = {
  chatItemId: Scalars['ID'];
};

export type ChatItemHeaderQuery = { __typename?: 'Query' } & {
  chatItem?: Maybe<
    | ({ __typename?: 'Subject' } & SubjectInHeaderFragment)
    | ({ __typename?: 'Dispute' } & Pick<Dispute, 'id'> & {
          subject: { __typename?: 'Subject' } & SubjectInHeaderFragment;
        })
  >;
};

export type SubjectInHeaderFragment = { __typename?: 'Subject' } & Pick<
  Subject,
  'id'
> & { topic: Subject['subject'] } & {
    disputes: Array<{ __typename?: 'Dispute' } & DisputeInHeaderFragment>;
    author: { __typename?: 'User' } & Pick<User, 'id'>;
  };

export type DisputeInHeaderFragment = { __typename?: 'Dispute' } & Pick<
  Dispute,
  'id'
> & {
    partnerA: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
    partnerB: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
  };

export type EditSubjectTitleMutationVariables = {
  subjectId: Scalars['ID'];
  title: Scalars['String'];
};

export type EditSubjectTitleMutation = { __typename?: 'Mutation' } & {
  editSubjectTitle: { __typename?: 'Subject' } & Pick<
    Subject,
    'id' | 'subject'
  >;
};

export type ChatItemQueryVariables = {
  id: Scalars['ID'];
};

export type ChatItemQuery = { __typename?: 'Query' } & {
  chatItem?: Maybe<
    | ({ __typename?: 'Subject' } & Pick<Subject, 'id'> & SubjectFragment)
    | ({ __typename?: 'Dispute' } & Pick<Dispute, 'id'> & DisputeFragment)
  >;
  me?: Maybe<{ __typename?: 'User' } & ChatPersonFragment>;
};

export type DisputeFragment = { __typename?: 'Dispute' } & Pick<
  Dispute,
  'id'
> & {
    subject: { __typename?: 'Subject' } & Pick<
      Subject,
      'id' | 'subject' | 'tweetId'
    >;
  } & ChatDisputeFragment;

export type SubjectFragment = { __typename?: 'Subject' } & Pick<
  Subject,
  'id' | 'tweetId'
> & { topic: Subject['subject'] } & ChatSubjectFragment;

export type ChatListQueryVariables = {
  after?: Maybe<Scalars['DateTime']>;
  before?: Maybe<Scalars['DateTime']>;
  search?: Maybe<Scalars['String']>;
  scope?: Maybe<ChatScope>;
};

export type ChatListQuery = { __typename?: 'Query' } & {
  chat?: Maybe<
    { __typename?: 'ChatConnection' } & {
      edges: Array<
        { __typename?: 'ChatEdge' } & Pick<ChatEdge, 'cursor'> & {
            node:
              | ({ __typename?: 'Subject' } & ChatListItem_Subject_Fragment)
              | ({ __typename?: 'Dispute' } & ChatListItem_Dispute_Fragment);
          }
      >;
      pageInfo: { __typename?: 'PageInfo' } & Pick<
        PageInfo,
        'startCursor' | 'endCursor' | 'hasNextPage'
      >;
    }
  >;
};

type ChatListItem_Subject_Fragment = { __typename?: 'Subject' } & Pick<
  Subject,
  'id' | 'lastUpdateAt'
> & { subjectTitle: Subject['subject'] } & {
    author: { __typename?: 'User' } & ChatPersonFragment;
  };

type ChatListItem_Dispute_Fragment = { __typename?: 'Dispute' } & Pick<
  Dispute,
  'createdAt' | 'id' | 'lastUpdateAt'
> & {
    subject: { __typename?: 'Subject' } & Pick<Subject, 'id' | 'subject'>;
    partnerA: { __typename?: 'User' } & ChatPersonFragment;
    partnerB: { __typename?: 'User' } & ChatPersonFragment;
  };

export type ChatListItemFragment =
  | ChatListItem_Subject_Fragment
  | ChatListItem_Dispute_Fragment;

export type ReplyOnDisputeMutationVariables = {
  disputeId: Scalars['ID'];
  message: Scalars['String'];
};

export type ReplyOnDisputeMutation = { __typename?: 'Mutation' } & {
  replyOnDispute: { __typename?: 'Dispute' } & Pick<
    Dispute,
    'id' | 'lastUpdateAt'
  > & {
      messages: Array<
        { __typename?: 'Message' } & Pick<Message, 'id' | 'text'> & {
            author: { __typename?: 'User' } & Pick<User, 'id'>;
          }
      >;
    };
};

export type TwitterTimelineQueryVariables = {
  after?: Maybe<Scalars['String']>;
};

export type TwitterTimelineQuery = { __typename?: 'Query' } & {
  twitterTimeline?: Maybe<
    { __typename?: 'TweetConnection' } & {
      edges: Array<
        { __typename?: 'TweetEdge' } & Pick<TweetEdge, 'cursor'> & {
            node: { __typename?: 'Tweet' } & Pick<Tweet, 'id' | 'link'>;
          }
      >;
      pageInfo: { __typename?: 'PageInfo' } & Pick<
        PageInfo,
        'startCursor' | 'endCursor'
      >;
    }
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & ChatPersonFragment>;
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

export type ReplyOnSubjectMutationVariables = {
  subjectId: Scalars['ID'];
  message: Scalars['String'];
};

export type ReplyOnSubjectMutation = { __typename?: 'Mutation' } & {
  replyOnSubject: { __typename?: 'Dispute' } & Pick<Dispute, 'id'>;
};

export type GetUserInfoByIdQueryVariables = {
  userId: Scalars['ID'];
};

export type GetUserInfoByIdQuery = { __typename?: 'Query' } & {
  user?: Maybe<{ __typename?: 'User' } & UserInfoFragment>;
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

export const DisputeInHeaderFragmentDoc = gql`
  fragment DisputeInHeader on Dispute {
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
`;
export const SubjectInHeaderFragmentDoc = gql`
  fragment SubjectInHeader on Subject {
    id
    topic: subject
    disputes {
      ...DisputeInHeader
    }
    author {
      id
    }
  }
  ${DisputeInHeaderFragmentDoc}
`;
export const ChatPersonFragmentDoc = gql`
  fragment ChatPerson on User {
    id
    name
    twitterHandle
    picture
  }
`;
export const MessageVotesFragmentDoc = gql`
  fragment MessageVotes on Votes {
    ups
    downs
    userVoting
  }
`;
export const ChatMessageFragmentDoc = gql`
  fragment ChatMessage on Message {
    id
    text
    createdAt
    author {
      ...ChatPerson
    }
    votes {
      ...MessageVotes
    }
  }
  ${ChatPersonFragmentDoc}
  ${MessageVotesFragmentDoc}
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
export const DisputeFragmentDoc = gql`
  fragment Dispute on Dispute {
    id
    subject {
      id
      subject
      tweetId
    }
    ...ChatDispute
  }
  ${ChatDisputeFragmentDoc}
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
export const SubjectFragmentDoc = gql`
  fragment Subject on Subject {
    id
    topic: subject
    tweetId
    ...ChatSubject
  }
  ${ChatSubjectFragmentDoc}
`;
export const ChatListItemFragmentDoc = gql`
  fragment ChatListItem on ChatItem {
    id
    lastUpdateAt
    ... on Dispute {
      createdAt
      subject {
        id
        subject
      }
      partnerA {
        ...ChatPerson
      }
      partnerB {
        ...ChatPerson
      }
    }
    ... on Subject {
      author {
        ...ChatPerson
      }
      subjectTitle: subject
    }
  }
  ${ChatPersonFragmentDoc}
`;
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    name
    picture
    allDisputes(limit: 10) {
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
    allSubjects(limit: 10) {
      edges {
        node {
          id
          subject
        }
      }
    }
  }
`;
export const VoteDocument = gql`
  mutation vote($messageId: ID!, $voting: UserVoting!) {
    vote(messageId: $messageId, voting: $voting) {
      id
      votes {
        ...MessageVotes
      }
    }
  }
  ${MessageVotesFragmentDoc}
`;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      voting: // value for 'voting'
 *   },
 * });
 */
export function useVoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    VoteMutation,
    VoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<VoteMutation, VoteMutationVariables>(
    VoteDocument,
    baseOptions,
  );
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = ApolloReactCommon.MutationResult<VoteMutation>;
export type VoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  VoteMutation,
  VoteMutationVariables
>;
export const EditMessageDocument = gql`
  mutation editMessage($messageId: ID!, $text: String!) {
    editMessage(messageId: $messageId, text: $text) {
      id
      text
    }
  }
`;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEditMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditMessageMutation,
    EditMessageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EditMessageMutation,
    EditMessageMutationVariables
  >(EditMessageDocument, baseOptions);
}
export type EditMessageMutationHookResult = ReturnType<
  typeof useEditMessageMutation
>;
export type EditMessageMutationResult = ApolloReactCommon.MutationResult<
  EditMessageMutation
>;
export type EditMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditMessageMutation,
  EditMessageMutationVariables
>;
export const ChatItemHeaderDocument = gql`
  query ChatItemHeader($chatItemId: ID!) {
    chatItem(id: $chatItemId) {
      ...SubjectInHeader
      ... on Dispute {
        id
        subject {
          ...SubjectInHeader
        }
      }
    }
  }
  ${SubjectInHeaderFragmentDoc}
`;

/**
 * __useChatItemHeaderQuery__
 *
 * To run a query within a React component, call `useChatItemHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatItemHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatItemHeaderQuery({
 *   variables: {
 *      chatItemId: // value for 'chatItemId'
 *   },
 * });
 */
export function useChatItemHeaderQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ChatItemHeaderQuery,
    ChatItemHeaderQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    ChatItemHeaderQuery,
    ChatItemHeaderQueryVariables
  >(ChatItemHeaderDocument, baseOptions);
}
export function useChatItemHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ChatItemHeaderQuery,
    ChatItemHeaderQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ChatItemHeaderQuery,
    ChatItemHeaderQueryVariables
  >(ChatItemHeaderDocument, baseOptions);
}
export type ChatItemHeaderQueryHookResult = ReturnType<
  typeof useChatItemHeaderQuery
>;
export type ChatItemHeaderLazyQueryHookResult = ReturnType<
  typeof useChatItemHeaderLazyQuery
>;
export type ChatItemHeaderQueryResult = ApolloReactCommon.QueryResult<
  ChatItemHeaderQuery,
  ChatItemHeaderQueryVariables
>;
export const EditSubjectTitleDocument = gql`
  mutation editSubjectTitle($subjectId: ID!, $title: String!) {
    editSubjectTitle(subjectId: $subjectId, title: $title) {
      id
      subject
    }
  }
`;

/**
 * __useEditSubjectTitleMutation__
 *
 * To run a mutation, you first call `useEditSubjectTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSubjectTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSubjectTitleMutation, { data, loading, error }] = useEditSubjectTitleMutation({
 *   variables: {
 *      subjectId: // value for 'subjectId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEditSubjectTitleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditSubjectTitleMutation,
    EditSubjectTitleMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EditSubjectTitleMutation,
    EditSubjectTitleMutationVariables
  >(EditSubjectTitleDocument, baseOptions);
}
export type EditSubjectTitleMutationHookResult = ReturnType<
  typeof useEditSubjectTitleMutation
>;
export type EditSubjectTitleMutationResult = ApolloReactCommon.MutationResult<
  EditSubjectTitleMutation
>;
export type EditSubjectTitleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditSubjectTitleMutation,
  EditSubjectTitleMutationVariables
>;
export const ChatItemDocument = gql`
  query ChatItem($id: ID!) {
    chatItem(id: $id) {
      id
      ...Dispute
      ...Subject
    }
    me {
      ...ChatPerson
    }
  }
  ${DisputeFragmentDoc}
  ${SubjectFragmentDoc}
  ${ChatPersonFragmentDoc}
`;

/**
 * __useChatItemQuery__
 *
 * To run a query within a React component, call `useChatItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChatItemQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ChatItemQuery,
    ChatItemQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ChatItemQuery, ChatItemQueryVariables>(
    ChatItemDocument,
    baseOptions,
  );
}
export function useChatItemLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ChatItemQuery,
    ChatItemQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ChatItemQuery, ChatItemQueryVariables>(
    ChatItemDocument,
    baseOptions,
  );
}
export type ChatItemQueryHookResult = ReturnType<typeof useChatItemQuery>;
export type ChatItemLazyQueryHookResult = ReturnType<
  typeof useChatItemLazyQuery
>;
export type ChatItemQueryResult = ApolloReactCommon.QueryResult<
  ChatItemQuery,
  ChatItemQueryVariables
>;
export const ChatListDocument = gql`
  query ChatList(
    $after: DateTime
    $before: DateTime
    $search: String
    $scope: ChatScope
  ) {
    chat(after: $after, before: $before, search: $search, scope: $scope) {
      edges {
        cursor
        node {
          ...ChatListItem
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
  ${ChatListItemFragmentDoc}
`;

/**
 * __useChatListQuery__
 *
 * To run a query within a React component, call `useChatListQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      search: // value for 'search'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useChatListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ChatListQuery,
    ChatListQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ChatListQuery, ChatListQueryVariables>(
    ChatListDocument,
    baseOptions,
  );
}
export function useChatListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ChatListQuery,
    ChatListQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ChatListQuery, ChatListQueryVariables>(
    ChatListDocument,
    baseOptions,
  );
}
export type ChatListQueryHookResult = ReturnType<typeof useChatListQuery>;
export type ChatListLazyQueryHookResult = ReturnType<
  typeof useChatListLazyQuery
>;
export type ChatListQueryResult = ApolloReactCommon.QueryResult<
  ChatListQuery,
  ChatListQueryVariables
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
      lastUpdateAt
    }
  }
`;

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
export const TwitterTimelineDocument = gql`
  query TwitterTimeline($after: String) {
    twitterTimeline(after: $after) {
      edges {
        cursor
        node {
          id
          link
        }
      }
      pageInfo {
        startCursor
        endCursor
      }
    }
  }
`;

/**
 * __useTwitterTimelineQuery__
 *
 * To run a query within a React component, call `useTwitterTimelineQuery` and pass it any options that fit your needs.
 * When your component renders, `useTwitterTimelineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTwitterTimelineQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useTwitterTimelineQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TwitterTimelineQuery,
    TwitterTimelineQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    TwitterTimelineQuery,
    TwitterTimelineQueryVariables
  >(TwitterTimelineDocument, baseOptions);
}
export function useTwitterTimelineLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TwitterTimelineQuery,
    TwitterTimelineQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    TwitterTimelineQuery,
    TwitterTimelineQueryVariables
  >(TwitterTimelineDocument, baseOptions);
}
export type TwitterTimelineQueryHookResult = ReturnType<
  typeof useTwitterTimelineQuery
>;
export type TwitterTimelineLazyQueryHookResult = ReturnType<
  typeof useTwitterTimelineLazyQuery
>;
export type TwitterTimelineQueryResult = ApolloReactCommon.QueryResult<
  TwitterTimelineQuery,
  TwitterTimelineQueryVariables
>;
export const MeDocument = gql`
  query me {
    me {
      ...ChatPerson
    }
  }
  ${ChatPersonFragmentDoc}
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
export const ReplyOnSubjectDocument = gql`
  mutation replyOnSubject($subjectId: ID!, $message: String!) {
    replyOnSubject(input: { subjectId: $subjectId, message: $message }) {
      id
    }
  }
`;

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

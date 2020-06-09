/* eslint-disable */
import { gql } from 'apollo-boost';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
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

export type VoteMutationVariables = {
  messageId: Scalars['ID'];
  voting: UserVoting;
};

export type VoteMutation = { __typename?: 'Mutation' } & {
  vote: { __typename?: 'Message' } & Pick<Message, 'id'> & {
      votes: { __typename?: 'Votes' } & MessageVotesFragment;
    };
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
    author: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture'>;
    votes: { __typename?: 'Votes' } & MessageVotesFragment;
  };

export type ChatPersonFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'picture'
>;

export type MessageVotesFragment = { __typename?: 'Votes' } & Pick<
  Votes,
  'ups' | 'downs' | 'userVoting'
>;

export type ClearNotificationsForDisputeMutationVariables = {
  disputeId: Scalars['ID'];
};

export type ClearNotificationsForDisputeMutation = {
  __typename?: 'Mutation';
} & {
  markNotificationsAsReadForDispute: { __typename?: 'NotificationsUpdate' } & {
    updatedNotification: Array<
      | ({ __typename?: 'NewMessageNotification' } & Pick<
          NewMessageNotification,
          'id' | 'read'
        >)
      | ({ __typename?: 'NewDisputeNotification' } & Pick<
          NewDisputeNotification,
          'id' | 'read'
        >)
    >;
    notificationStatus: { __typename?: 'NotificationStatus' } & Pick<
      NotificationStatus,
      'totalCountUnread'
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

export type NotificationListQueryVariables = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type NotificationListQuery = { __typename?: 'Query' } & {
  notificationStatus: { __typename?: 'NotificationStatus' } & Pick<
    NotificationStatus,
    'totalCountUnread'
  >;
  allNotifications?: Maybe<
    { __typename?: 'NotificationConnection' } & Pick<
      NotificationConnection,
      'totalCount'
    > & {
        pageInfo: { __typename?: 'PageInfo' } & Pick<
          PageInfo,
          'hasNextPage' | 'startCursor' | 'endCursor'
        >;
        edges: Array<
          { __typename?: 'NotificationEdge' } & {
            node:
              | ({ __typename: 'NewMessageNotification' } & Pick<
                  NewMessageNotification,
                  'id' | 'createdAt' | 'read'
                > & {
                    message: { __typename?: 'Message' } & Pick<
                      Message,
                      'id'
                    > & {
                        author: { __typename?: 'User' } & ChatPersonFragment;
                        dispute: { __typename?: 'Dispute' } & Pick<
                          Dispute,
                          'id'
                        >;
                      };
                  })
              | ({ __typename: 'NewDisputeNotification' } & Pick<
                  NewDisputeNotification,
                  'id' | 'createdAt' | 'read'
                > & {
                    dispute: { __typename?: 'Dispute' } & Pick<
                      Dispute,
                      'id'
                    > & {
                        partnerB: { __typename?: 'User' } & ChatPersonFragment;
                      };
                  });
          }
        >;
      }
  >;
};

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

export type MeUserInfoQueryVariables = {};

export type MeUserInfoQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & UserInfoFragment>;
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
      id
      name
      picture
    }
    votes {
      ...MessageVotes
    }
  }
  ${MessageVotesFragmentDoc}
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
export const ClearNotificationsForDisputeDocument = gql`
  mutation clearNotificationsForDispute($disputeId: ID!) {
    markNotificationsAsReadForDispute(disputeId: $disputeId) {
      updatedNotification {
        id
        read
      }
      notificationStatus {
        totalCountUnread
      }
    }
  }
`;

/**
 * __useClearNotificationsForDisputeMutation__
 *
 * To run a mutation, you first call `useClearNotificationsForDisputeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearNotificationsForDisputeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearNotificationsForDisputeMutation, { data, loading, error }] = useClearNotificationsForDisputeMutation({
 *   variables: {
 *      disputeId: // value for 'disputeId'
 *   },
 * });
 */
export function useClearNotificationsForDisputeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ClearNotificationsForDisputeMutation,
    ClearNotificationsForDisputeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ClearNotificationsForDisputeMutation,
    ClearNotificationsForDisputeMutationVariables
  >(ClearNotificationsForDisputeDocument, baseOptions);
}
export type ClearNotificationsForDisputeMutationHookResult = ReturnType<
  typeof useClearNotificationsForDisputeMutation
>;
export type ClearNotificationsForDisputeMutationResult = ApolloReactCommon.MutationResult<
  ClearNotificationsForDisputeMutation
>;
export type ClearNotificationsForDisputeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ClearNotificationsForDisputeMutation,
  ClearNotificationsForDisputeMutationVariables
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
export const NotificationListDocument = gql`
  query NotificationList($after: String, $before: String) {
    notificationStatus {
      totalCountUnread
    }
    allNotifications(first: 10, last: 10, after: $after, before: $before) {
      totalCount
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          createdAt
          read
          __typename
          ... on NewMessageNotification {
            message {
              id
              author {
                ...ChatPerson
              }
              dispute {
                id
              }
            }
          }
          ... on NewDisputeNotification {
            dispute {
              id
              partnerB {
                ...ChatPerson
              }
            }
          }
        }
      }
    }
  }
  ${ChatPersonFragmentDoc}
`;

/**
 * __useNotificationListQuery__
 *
 * To run a query within a React component, call `useNotificationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useNotificationListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    NotificationListQuery,
    NotificationListQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    NotificationListQuery,
    NotificationListQueryVariables
  >(NotificationListDocument, baseOptions);
}
export function useNotificationListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    NotificationListQuery,
    NotificationListQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    NotificationListQuery,
    NotificationListQueryVariables
  >(NotificationListDocument, baseOptions);
}
export type NotificationListQueryHookResult = ReturnType<
  typeof useNotificationListQuery
>;
export type NotificationListLazyQueryHookResult = ReturnType<
  typeof useNotificationListLazyQuery
>;
export type NotificationListQueryResult = ApolloReactCommon.QueryResult<
  NotificationListQuery,
  NotificationListQueryVariables
>;
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
export const MeUserInfoDocument = gql`
  query meUserInfo {
    me {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useMeUserInfoQuery__
 *
 * To run a query within a React component, call `useMeUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeUserInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MeUserInfoQuery,
    MeUserInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MeUserInfoQuery, MeUserInfoQueryVariables>(
    MeUserInfoDocument,
    baseOptions,
  );
}
export function useMeUserInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeUserInfoQuery,
    MeUserInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    MeUserInfoQuery,
    MeUserInfoQueryVariables
  >(MeUserInfoDocument, baseOptions);
}
export type MeUserInfoQueryHookResult = ReturnType<typeof useMeUserInfoQuery>;
export type MeUserInfoLazyQueryHookResult = ReturnType<
  typeof useMeUserInfoLazyQuery
>;
export type MeUserInfoQueryResult = ApolloReactCommon.QueryResult<
  MeUserInfoQuery,
  MeUserInfoQueryVariables
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

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import withApollo from 'next-with-apollo';
import {
  ApolloClient,
  ApolloProvider,
  defaultDataIdFromObject,
  InMemoryCache,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { FieldPolicy } from '@apollo/client/cache';
import possibleTypes from '../graphql/generated/introspection';

// The relay implementation has a bug
// see https://github.com/apollographql/apollo-client/issues/6502#issuecomment-662195579
// This should temporary fix it:
const fixedRelayStylePagination = (...args): FieldPolicy => ({
  ...relayStylePagination(...args),
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  read: (...readArgs) => {
    const existing = readArgs[0];
    const originalRead = relayStylePagination(...args).read;

    if (!existing || !originalRead) {
      return;
    }
    return originalRead(...readArgs);
  },
});

const createCache = (initialState: any): InMemoryCache =>
  new InMemoryCache({
    possibleTypes: possibleTypes.possibleTypes,
    dataIdFromObject: (object): string | undefined => {
      switch (object.__typename) {
        case 'NotificationStatus':
          return 'NotificationStatus';
        default:
          return defaultDataIdFromObject(object);
      }
    },
    typePolicies: {
      Query: {
        fields: {
          chat: fixedRelayStylePagination(['search', 'scope']),
          twitterTimeline: fixedRelayStylePagination(),
        },
      },
    },
  }).restore(initialState || {});

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: '/api/graphql',
      cache: createCache(initialState),
    }),
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  },
);

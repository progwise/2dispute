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
import possibleTypes from '../graphql/generated/introspection';

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

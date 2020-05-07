/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import withApollo from 'next-with-apollo';
import ApolloClient, {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import introspectionQueryResultData from '../graphql/generated/introspection';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const createCache = (initialState: any): InMemoryCache =>
  new InMemoryCache({ fragmentMatcher }).restore(initialState || {});

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

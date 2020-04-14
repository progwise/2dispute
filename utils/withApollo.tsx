/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import React from 'react';
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: '/api/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
    }),
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  },
);

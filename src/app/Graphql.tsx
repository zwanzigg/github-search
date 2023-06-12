import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import LogIn from './LogIn';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export const Graphql = () => {
  return (
    <ApolloProvider client={client}>
      <LogIn />
    </ApolloProvider>
  );
};

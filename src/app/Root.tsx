import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Pages } from '../components/Pages';
import { MissingEnvVariable } from '../components/MissingEnvVariable';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export const Root = () => {
  return (
    <ApolloProvider client={client}>
      {!GITHUB_TOKEN ? MissingEnvVariable() : <Pages />}
    </ApolloProvider>
  );
};

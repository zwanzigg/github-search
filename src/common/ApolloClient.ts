import { ApolloClient, InMemoryCache } from '@apollo/client';
import { mergeComments } from '../app/Root';
import { GITHUB_GRAPHQL_API_URL } from './constants';

export const client = (token: string) =>
  new ApolloClient({
    uri: GITHUB_GRAPHQL_API_URL,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'cache-first',
      },
    },
    cache: new InMemoryCache({
      typePolicies: {
        Issue: {
          fields: {
            comments: {
              keyArgs: false,
              merge(existing, incoming) {
                const incomingNodes = incoming.nodes;
                const existingNodes = existing?.nodes || [];
                const merged = mergeComments(existingNodes, incomingNodes);

                return {
                  ...incoming,
                  nodes: merged,
                };
              },
            },
          },
        },
      },
    }),
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

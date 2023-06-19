import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Pages } from '../components/Pages';
import { MissingEnvVariable } from '../components/MissingEnvVariable';
import { IssuesCommentsNode } from '../common/types';
import { client } from '../common/ApolloClient';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const Root = () => {
  if (!GITHUB_TOKEN) {
    return <MissingEnvVariable />;
  }
  return (
    <ApolloProvider client={client(GITHUB_TOKEN)}>
      <Pages />
    </ApolloProvider>
  );
};

export const mergeComments = (
  existingNodes: IssuesCommentsNode[],
  incoming: IssuesCommentsNode[],
): IssuesCommentsNode[] => {
  const mergedSet = new Set<string>();

  // Add existing nodes to the mergedSet in order
  for (const node of existingNodes) {
    mergedSet.add(node.__ref);
  }

  // Add incoming nodes to the mergedSet if they don't already exist
  for (const node of incoming) {
    if (!mergedSet.has(node.__ref)) {
      mergedSet.add(node.__ref);
    }
  }

  // Create the merged array while preserving the order
  const mergedArray: IssuesCommentsNode[] = [];
  for (const value of existingNodes.concat(incoming)) {
    if (mergedSet.has(value.__ref)) {
      mergedArray.push(value);
      mergedSet.delete(value.__ref);
    }
  }

  return mergedArray;
};

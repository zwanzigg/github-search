import {
  IssueStatus,
  SearchCommentsResult,
  SearchIssuesResult,
  SearchVariables,
} from './types';
import { formatSearchIssuesQuery } from './utils';

import { makeVar } from '@apollo/client';

export const GITHUB_GRAPHQL_API_URL = 'https://api.github.com/graphql';

export const DEFAULT_ISSUES_SEARCH_RESULTS: SearchIssuesResult = {
  search: {
    issueCount: 0,
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: null,
      startCursor: null,
    },
  },
};

export const DEFAULT_COMMENTS_RESULTS: SearchCommentsResult = {
  totalCount: 0,
  nodes: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: null,
    startCursor: null,
  },
};

export const SEARCH_LIMIT = 2;
export const COMMENTS_SEARCH_LIMIT = 2;

export const DEFAULT_SEARCH_VARIABLES: SearchVariables = {
  text: formatSearchIssuesQuery('', 'open'),
  first: SEARCH_LIMIT,
  after: null,
  before: null,
  last: null,
  comments_first: COMMENTS_SEARCH_LIMIT,
  comments_after: null,
};

export const reactiveCurrentIssueId = makeVar('');

export const reactiveCurrentSearchVariables = makeVar<SearchVariables>(
  DEFAULT_SEARCH_VARIABLES,
);

export const reactiveCurrentSearchInput = makeVar('');

export const reactiveCurrentSearchStatus = makeVar<IssueStatus>('open');

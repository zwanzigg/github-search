import {
  SearchCommentsResult,
  SearchIssuesResult,
  SearchVariables,
} from './types';
import { formatSearchIssuesQuery } from './utils';

import { makeVar } from '@apollo/client';

export const currentIssueId = makeVar('');

export const DEFAULT_ISSUES_SEARCH_RESULTS: SearchIssuesResult = {
  search: {
    issueCount: 0,
    nodes: [],
    edges: [],
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
  edges: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: null,
    startCursor: null,
  },
};

export const SEARCH_LIMIT = 2;

export const DEFAULT_SEARCH_VARIABLES: SearchVariables = {
  text: formatSearchIssuesQuery('', 'open'),
  first: SEARCH_LIMIT,
  after: null,
  before: null,
  last: null,
};

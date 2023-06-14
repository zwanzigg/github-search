import { SearchNodes, SearchVariables } from './types';
import { formatSearchIssuesQuery } from './utils';

export const DEFAULT_SEARCH_NODES: SearchNodes = {
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

export const SEARCH_LIMIT = 2;

export const DEFAULT_SEARCH_VARIABLES: SearchVariables = {
  text: formatSearchIssuesQuery('', 'open'),
  first: SEARCH_LIMIT,
  after: null,
  before: null,
  last: null,
};

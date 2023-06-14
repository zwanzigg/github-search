import { SearchNodes } from './types';

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

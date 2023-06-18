import { IssuesNode, IssueStatus } from './types';
import {
  currentSearchInput,
  currentSearchStatus,
  currentSearchVariables,
  SEARCH_LIMIT,
} from './constants';

export const formatSearchIssuesQuery = (
  searchString: string,
  status: IssueStatus,
) => {
  return `repo:facebook/react type:issue is:${status} in:title in:body in:comments sort:comments-desc ${searchString}`;
};

export const filterOutNotIssues = (data: IssuesNode[]) => {
  return data?.filter((item) => item.__typename === 'Issue');
};

export const getNextPage = (endCursor: string | null) => {
  currentSearchVariables({
    text: formatSearchIssuesQuery(currentSearchInput(), currentSearchStatus()),
    first: SEARCH_LIMIT,
    after: endCursor,
    before: null,
    last: null,
  });
};
export const getPrevPage = (startCursor: string | null) => {
  currentSearchVariables({
    text: formatSearchIssuesQuery(currentSearchInput(), currentSearchStatus()),
    last: SEARCH_LIMIT,
    before: startCursor,
    after: null,
    first: null,
  });
};

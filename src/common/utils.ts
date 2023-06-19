import { IssuesNode, IssueStatus, SearchIssuesResult } from './types';
import {
  DEFAULT_COMMENTS_RESULTS,
  DEFAULT_SEARCH_VARIABLES,
  reactiveCurrentSearchInput,
  reactiveCurrentSearchStatus,
  reactiveCurrentSearchVariables,
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
  reactiveCurrentSearchVariables({
    ...DEFAULT_SEARCH_VARIABLES,
    text: formatSearchIssuesQuery(
      reactiveCurrentSearchInput(),
      reactiveCurrentSearchStatus(),
    ),
    first: SEARCH_LIMIT,
    after: endCursor,
    before: null,
    last: null,
  });
};
export const getPrevPage = (startCursor: string | null) => {
  reactiveCurrentSearchVariables({
    ...DEFAULT_SEARCH_VARIABLES,
    text: formatSearchIssuesQuery(
      reactiveCurrentSearchInput(),
      reactiveCurrentSearchStatus(),
    ),
    last: SEARCH_LIMIT,
    before: startCursor,
    after: null,
    first: null,
  });
};

export const findCommentsForCurrentIssue = (
  data: SearchIssuesResult,
  issueId: string,
) => {
  return (
    (data?.search?.nodes.length &&
      data?.search?.nodes.find((item) => item.id === issueId)?.comments) ||
    DEFAULT_COMMENTS_RESULTS
  );
};

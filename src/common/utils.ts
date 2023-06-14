import { IssuesNode, IssueStatus } from './types';

export const formatSearchIssuesQuery = (
  searchString: string,
  status: IssueStatus,
) => {
  return `repo:facebook/react type:issue is:${status} in:title in:body in:comments ${searchString}`;
};

export const filterOutNotIssues = (data: IssuesNode[]) => {
  return data?.filter((item) => item.__typename === 'Issue');
};

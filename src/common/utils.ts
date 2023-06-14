import { IssuesNode } from './types';

export const formatSearchIssuesQuery = (searchString: string) => {
  return `repo:facebook/react type:issue in:title in:body in:comments ${searchString}`;
};

export const filterOutNotIssues = (data: IssuesNode[]) => {
  return data?.filter((item) => item.__typename === 'Issue');
};

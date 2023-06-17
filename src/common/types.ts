export interface SearchIssuesResult {
  search: {
    issueCount: number;
    nodes: IssuesNode[];
    edges: {
      cursor: string;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string | null;
      startCursor: string | null;
    };
  };
}

export interface IssuesNode {
  author: NodeAuthor;
  body: string;
  bodyHTML: string;
  createdAt: Date;
  title: string;
  comments: SearchCommentsResult;
  id: string;
  __typename: string;
}

export interface NodeAuthor {
  avatarUrl: string;
  login: string;
  url: string;
}

export interface SearchCommentsResult {
  nodes: IssuesCommentsNode[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string | null;
    startCursor: string | null;
  };
  totalCount: number;
  edges: {
    cursor: string;
  }[];
}

export interface IssuesCommentsNode {
  body: string;
  bodyHTML: string;
  author: NodeAuthor;
  id: string;
}

export type IssueStatus = 'open' | 'closed';

export interface SearchVariables {
  text: string;
  first: number | null;
  last: number | null;
  after: string | null;
  before: string | null;
}

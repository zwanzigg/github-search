export interface SearchNodes {
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
  createdAt: Date;
  title: string;
  comments: IssuesComments;
  id: string;
  __typename: string;
}

export interface NodeAuthor {
  avatarUrl: string;
  login: string;
  url: string;
}

export interface IssuesComments {
  nodes: IssuesCommentsNode[];
}

export interface IssuesCommentsNode {
  body: string;
  author: NodeAuthor;
}

export type IssueStatus = 'open' | 'closed';

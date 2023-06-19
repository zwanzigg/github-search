import { gql } from '@apollo/client';

export const ISSUES_QUERY = gql`
  query (
    $text: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
    $comments_first: Int
    $comments_after: String
  ) {
    search(
      type: ISSUE
      query: $text
      first: $first
      after: $after
      before: $before
      last: $last
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      issueCount
      nodes {
        __typename
        ... on Issue {
          id
          author {
            avatarUrl
            login
            url
          }
          number
          bodyHTML
          createdAt
          title
          comments(first: $comments_first, after: $comments_after) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
            }
            totalCount
            nodes {
              id
              bodyHTML
              author {
                avatarUrl
                login
                url
              }
            }
          }
        }
      }
    }
  }
`;

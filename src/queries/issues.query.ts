import { gql } from '@apollo/client';

export const ISSUES_QUERY = gql`
  query (
    $text: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
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
      edges {
        cursor
      }
      nodes {
        __typename
        ... on Issue {
          id
          author {
            avatarUrl
            login
            url
          }
          body
          bodyHTML
          createdAt
          title
          comments(first: 10) {
            nodes {
              body
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

import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  {
    viewer {
      login
    }
  }
`;

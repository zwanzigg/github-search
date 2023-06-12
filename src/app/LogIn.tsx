import React, { ReactElement } from 'react';
import { useQuery, gql } from '@apollo/client';

const LOGIN_QUERY = gql`
  {
    viewer {
      login
    }
  }
`;

export default function LogIn(): ReactElement {
  const { data, loading, error } = useQuery(LOGIN_QUERY);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>You logged in as ${data.viewer.login}</h1>
      <ul></ul>
    </div>
  );
}

import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@apollo/client';
import { ISSUES_QUERY } from '../queries/issues.query';
import { IssueStatus, SearchNodes } from '../common/types';
import {
  DEFAULT_SEARCH_NODES,
  DEFAULT_SEARCH_VARIABLES,
  SEARCH_LIMIT,
} from '../common/constants';
import { formatSearchIssuesQuery } from '../common/utils';
import { SearchBarContainer } from './SearchBarContainer';
import { SearchResultsContainer } from './SearchResultsContainer';

export function IssuesContainer() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<IssueStatus>('open');

  const {
    refetch,
    loading,
    error,
    data = DEFAULT_SEARCH_NODES,
  } = useQuery<SearchNodes>(ISSUES_QUERY, {
    variables: DEFAULT_SEARCH_VARIABLES,
    nextFetchPolicy: 'cache-first', // TODO: check this
  });

  const triggerSearch = () => {
    refetch({
      text: formatSearchIssuesQuery(input, status),
      first: SEARCH_LIMIT,
      last: null,
      after: null,
      before: null,
    });
  };

  useEffect(() => {
    refetch({
      text: formatSearchIssuesQuery(input, status),
      first: SEARCH_LIMIT,
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || '';
    setInput(value);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const newStatus = checked ? 'open' : 'closed';
    setStatus(newStatus);
    refetch({
      text: formatSearchIssuesQuery(input, newStatus),
      first: SEARCH_LIMIT,
      last: null,
      after: null,
      before: null,
    });
  };

  return (
    <>
      <Grid xs={6} md={4}>
        <SearchBarContainer
          triggerSearch={triggerSearch}
          handleInput={handleInputChange}
          handleStatusChange={handleStatusChange}
          status={status}
        />
      </Grid>
      <Grid xs={6} md={8}>
        <SearchResultsContainer
          data={data}
          error={error}
          loading={loading}
          refetch={refetch}
          input={input}
          status={status}
        />
      </Grid>
    </>
  );
}

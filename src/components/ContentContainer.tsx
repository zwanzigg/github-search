import * as React from 'react';
import { FC, ReactElement, useEffect, useState } from 'react';
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
import { AppBar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CommentsContainer } from './CommentsContainer';
import { SearchResultsContainer } from './SearchResultsContainer';
import { Content } from './Content';

export const ContentContainer: FC<{ username: string }> = ({
  username,
}): ReactElement => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<IssueStatus>('open');

  const {
    refetch,
    loading,
    error,
    data = DEFAULT_SEARCH_NODES,
  } = useQuery<SearchNodes>(ISSUES_QUERY, {
    variables: DEFAULT_SEARCH_VARIABLES,
    nextFetchPolicy: 'cache-first', // TODO: set up caching strategy
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
    <Content
      username={username}
      triggerSearch={triggerSearch}
      handleInputChange={handleInputChange}
      handleStatusChange={handleStatusChange}
      status={status}
      data={data}
      loading={loading}
      error={error}
      input={input}
      refetch={refetch}
    />
  );
};

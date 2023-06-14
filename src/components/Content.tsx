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

export const Content: FC<{ username: string }> = ({
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
    <>
      <AppBar
        position="sticky"
        style={{ height: '150px', backgroundColor: 'rgb(242, 242, 242)' }}
      >
        <Grid container spacing={5} margin={0}>
          <Grid xs={1} md={1}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <AccountCircleIcon color={'primary'} />
              <Typography variant="body1" color={'primary'}>
                @{username}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={11} md={11}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <SearchBarContainer
                triggerSearch={triggerSearch}
                handleInput={handleInputChange}
                handleStatusChange={handleStatusChange}
                status={status}
              />
            </Box>
          </Grid>
        </Grid>
      </AppBar>
      <Grid container spacing={5} style={{ marginTop: '10px' }}>
        <Grid xs={6} md={4}>
          <CommentsContainer data={data} />
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
      </Grid>
    </>
  );
};

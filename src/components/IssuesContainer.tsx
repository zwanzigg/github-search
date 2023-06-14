import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@apollo/client';
import { IssuesList } from './IssuesList';
import SearchBar from './SearchBar';
import { ISSUES_QUERY } from '../queries/issues.query';
import { SearchNodes } from '../common/types';
import { Alert, IconButton, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { LinearLoader } from './LinearLoader';
import { ContentContainer } from './styled/ContentContainer';
import { NavigateContainer } from './styled/NavigateContainer';
import { DEFAULT_SEARCH_NODES } from '../common/constants';
import { filterOutNotIssues, formatSearchIssuesQuery } from '../common/utils';

export function IssuesContainer() {
  const SEARCH_LIMIT = 2;
  const [input, setInput] = useState('');
  const {
    refetch,
    loading,
    error,
    data = DEFAULT_SEARCH_NODES,
  } = useQuery<SearchNodes>(ISSUES_QUERY, {
    variables: {
      text: formatSearchIssuesQuery(input),
      first: SEARCH_LIMIT,
      after: null,
      before: null,
      last: null,
    },
    nextFetchPolicy: 'cache-first', // TODO: check this
  });

  const getNextPage = () => {
    refetch({
      text: formatSearchIssuesQuery(input),
      first: SEARCH_LIMIT,
      after: data.search.pageInfo.endCursor,
      before: null,
      last: null,
    });
  };
  const getPrevPage = () => {
    refetch({
      text: formatSearchIssuesQuery(input),
      last: SEARCH_LIMIT,
      before: data.search.pageInfo.startCursor,
      after: null,
      first: null,
    });
  };
  const triggerSearch = () => {
    refetch({
      text: formatSearchIssuesQuery(input),
      first: SEARCH_LIMIT,
      after: null,
      before: null,
    });
  };

  useEffect(() => {
    refetch({
      text: formatSearchIssuesQuery(input),
      first: SEARCH_LIMIT,
    });
  }, []);

  const issues = filterOutNotIssues(data.search.nodes);
  const totalIssuesCount = data.search.issueCount;
  const hasNextPage = data.search.pageInfo.hasNextPage;
  const hasPreviousPage = data.search.pageInfo.hasPreviousPage;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || '';
    setInput(value);
  };

  return (
    <>
      <Grid xs={6} md={4}>
        <ContentContainer>
          <Typography variant="h6" component="div">
            Presented: {issues.length}
          </Typography>
          <Typography variant="h6" component="div">
            Total: {totalIssuesCount}
          </Typography>
          <SearchBar handleInput={handleInput} handleEnter={triggerSearch} />
        </ContentContainer>
      </Grid>
      <Grid xs={6} md={8}>
        <ContentContainer>
          {loading ? (
            <LinearLoader />
          ) : error ? (
            <Alert severity="error">{error.message}</Alert>
          ) : (
            <>
              <NavigateContainer>
                <IconButton onClick={getPrevPage} disabled={!hasPreviousPage}>
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton onClick={getNextPage} disabled={!hasNextPage}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </NavigateContainer>

              <IssuesList list={issues} />
            </>
          )}
        </ContentContainer>
      </Grid>
    </>
  );
}

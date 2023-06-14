import { LinearLoader } from './LinearLoader';
import { Alert, IconButton, Typography } from '@mui/material';
import { NavigateContainer } from './styled/NavigateContainer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IssuesList } from './IssuesList';
import { ContentContainer } from './styled/ContentContainer';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import { filterOutNotIssues, formatSearchIssuesQuery } from '../common/utils';
import { SEARCH_LIMIT } from '../common/constants';
import { ApolloError } from '@apollo/client/errors';
import { IssueStatus, SearchNodes, SearchVariables } from '../common/types';
import { ApolloQueryResult } from '@apollo/client';

export const SearchResultsContainer: FC<{
  error: ApolloError | undefined;
  loading: boolean;
  data: SearchNodes;
  input: string;
  status: IssueStatus;
  refetch: (
    variables?: Partial<SearchVariables> | undefined,
  ) => Promise<ApolloQueryResult<SearchNodes>>;
}> = ({ error, loading, data, refetch, input, status }): ReactElement => {
  const issues = filterOutNotIssues(data.search.nodes);
  const totalIssuesCount = data.search.issueCount;
  const hasNextPage = data.search.pageInfo.hasNextPage;
  const hasPreviousPage = data.search.pageInfo.hasPreviousPage;

  const getNextPage = () => {
    refetch({
      text: formatSearchIssuesQuery(input, status),
      first: SEARCH_LIMIT,
      after: data.search.pageInfo.endCursor,
      before: null,
      last: null,
    });
  };
  const getPrevPage = () => {
    refetch({
      text: formatSearchIssuesQuery(input, status),
      last: SEARCH_LIMIT,
      before: data.search.pageInfo.startCursor,
      after: null,
      first: null,
    });
  };
  return (
    <ContentContainer>
      {loading ? (
        <LinearLoader />
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : (
        <>
          <Typography variant="h6" component="div">
            Presented: {issues.length} of {totalIssuesCount}
          </Typography>

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
  );
};
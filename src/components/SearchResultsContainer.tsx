import { LinearLoader } from './LinearLoader';
import { Alert, IconButton, Typography } from '@mui/material';
import { NavigateContainer } from './styled/NavigateContainer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IssuesList } from './IssuesList';
import { PaperWrap } from './styled/PaperWrap';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import { filterOutNotIssues, formatSearchIssuesQuery } from '../common/utils';
import { SEARCH_LIMIT } from '../common/constants';
import { ApolloError } from '@apollo/client/errors';
import {
  IssueStatus,
  SearchIssuesResult,
  SearchVariables,
} from '../common/types';
import { ApolloQueryResult } from '@apollo/client';

export const SearchResultsContainer: FC<{
  error: ApolloError | undefined;
  loading: boolean;
  data: SearchIssuesResult;
  input: string;
  status: IssueStatus;
  refetch: (
    variables?: Partial<SearchVariables> | undefined,
  ) => Promise<ApolloQueryResult<SearchIssuesResult>>;
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
    <PaperWrap>
      {loading ? (
        <LinearLoader />
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : (
        <>
          <Typography variant="h6" component="div">
            Issues Presented: {issues.length} of {totalIssuesCount}
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
    </PaperWrap>
  );
};

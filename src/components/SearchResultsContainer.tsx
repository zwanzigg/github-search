import { LinearLoader } from './LinearLoader';
import { Alert, IconButton, Typography } from '@mui/material';
import { NavigateContainer } from './styled/NavigateContainer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IssuesList } from './IssuesList';
import { PaperWrap } from './styled/PaperWrap';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import { getNextPage, getPrevPage } from '../common/utils';
import { ApolloError } from '@apollo/client/errors';
import { SearchIssuesResult } from '../common/types';

export const SearchResultsContainer: FC<{
  error: ApolloError | undefined;
  loading: boolean;
  data: SearchIssuesResult;
}> = ({ error, loading, data }): ReactElement => {
  const displayedIssuesLength = data.search.nodes.length;
  const totalIssuesCount = data.search.issueCount;
  const hasNextPage = data.search.pageInfo.hasNextPage;
  const hasPreviousPage = data.search.pageInfo.hasPreviousPage;

  return (
    <PaperWrap>
      {loading ? (
        <LinearLoader />
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : (
        <>
          <Typography variant="h6" component="div">
            Issues Presented: {displayedIssuesLength} of {totalIssuesCount}
          </Typography>

          <NavigateContainer>
            <IconButton
              onClick={() => getPrevPage(data.search.pageInfo.endCursor)}
              disabled={!hasPreviousPage}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={() => getNextPage(data.search.pageInfo.startCursor)}
              disabled={!hasNextPage}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </NavigateContainer>

          <IssuesList />
        </>
      )}
    </PaperWrap>
  );
};

import * as React from 'react';
import { FC, ReactElement } from 'react';
import { SearchIssuesResult } from '../common/types';
import {
  currentIssueId,
  DEFAULT_COMMENTS_RESULTS,
  DEFAULT_ISSUES_SEARCH_RESULTS,
} from '../common/constants';
import { AppBar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { SearchBarContainer } from './SearchBarContainer';
import { CommentsContainer } from './CommentsContainer';
import { SearchResultsContainer } from './SearchResultsContainer';
import { useReactiveVar } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { User } from './User';

export const Content: FC<{
  username: string;
  data: SearchIssuesResult;
  loading: boolean;
  error: ApolloError | undefined;
}> = ({
  username,
  data = DEFAULT_ISSUES_SEARCH_RESULTS,
  loading,
  error,
}): ReactElement => {
  const currentID = useReactiveVar(currentIssueId);
  const comments =
    (data?.search?.nodes.length &&
      data?.search?.nodes.find((item) => item.id === currentID)?.comments) ||
    DEFAULT_COMMENTS_RESULTS;
  return (
    <>
      <AppBar
        position="sticky"
        style={{ height: '150px', backgroundColor: 'rgb(242, 242, 242)' }}
      >
        <Grid container spacing={5} margin={0}>
          <Grid xs={1} md={1}>
            <User username={username} />
          </Grid>
          <Grid xs={11} md={11}>
            <SearchBarContainer />
          </Grid>
        </Grid>
      </AppBar>
      <Grid container spacing={5} style={{ marginTop: '10px' }}>
        <Grid xs={6} md={4}>
          <CommentsContainer comments={comments} />
        </Grid>
        <Grid xs={6} md={8}>
          <SearchResultsContainer data={data} error={error} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
};

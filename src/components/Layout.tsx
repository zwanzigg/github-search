import * as React from 'react';
import { FC, ReactElement } from 'react';
import { SearchIssuesResult } from '../common/types';
import {
  DEFAULT_ISSUES_SEARCH_RESULTS,
  reactiveCurrentSearchVariables,
} from '../common/constants';
import { AppBar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { SearchContainer } from './Search/SearchContainer';
import { CommentsContainer } from './Comments/CommentsContainer';
import { IssuesContainer } from './Issues/IssuesContainer';
import { useQuery, useReactiveVar } from '@apollo/client';
import { User } from './User';
import { ISSUES_QUERY } from '../queries/issues.query';

export const Layout: FC<{
  username: string;
}> = ({ username }): ReactElement => {
  const currentVariables = useReactiveVar(reactiveCurrentSearchVariables);
  const {
    loading,
    error,
    data = DEFAULT_ISSUES_SEARCH_RESULTS,
  } = useQuery<SearchIssuesResult>(ISSUES_QUERY, {
    variables: currentVariables,
  });

  const notReLoading = loading && !data?.search?.nodes.length;
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
            <SearchContainer />
          </Grid>
        </Grid>
      </AppBar>
      <Grid container spacing={5} style={{ marginTop: '10px' }}>
        <Grid xs={6} md={4}>
          <CommentsContainer loading={loading} />
        </Grid>
        <Grid xs={6} md={8}>
          <IssuesContainer data={data} error={error} loading={notReLoading} />
        </Grid>
      </Grid>
    </>
  );
};

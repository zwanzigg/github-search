import * as React from 'react';
import { FC, ReactElement } from 'react';
import {
  IssueStatus,
  SearchIssuesResult,
  SearchVariables,
} from '../common/types';
import {
  DEFAULT_COMMENTS_RESULTS,
  DEFAULT_ISSUES_SEARCH_RESULTS,
} from '../common/constants';
import { AppBar, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SearchBarContainer } from './SearchBarContainer';
import { CommentsContainer } from './CommentsContainer';
import { SearchResultsContainer } from './SearchResultsContainer';
import { ApolloQueryResult, useReactiveVar } from '@apollo/client';
import { currentIssueId } from '../common/constants';
import { ApolloError } from '@apollo/client/errors';

export const Content: FC<{
  username: string;
  triggerSearch: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  status: IssueStatus;
  data: SearchIssuesResult;
  loading: boolean;
  error: ApolloError  | undefined;
  input: string;
  refetch: (
    variables?: Partial<SearchVariables> | undefined,
  ) => Promise<ApolloQueryResult<SearchIssuesResult>>;
}> = ({
  username,
  refetch,
  input,
  triggerSearch,
  handleInputChange,
  handleStatusChange,
  status,
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
          <CommentsContainer comments={comments} />
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

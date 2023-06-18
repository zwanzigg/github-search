import * as React from 'react';
import { ReactElement } from 'react';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import {
  currentSearchInput,
  currentSearchStatus,
  currentSearchVariables,
  SEARCH_LIMIT,
} from '../common/constants';
import { useReactiveVar } from '@apollo/client';
import { formatSearchIssuesQuery } from '../common/utils';

export const SearchBarContainer = (): ReactElement => {
  const currentInput = useReactiveVar(currentSearchInput);
  const currentStatus = useReactiveVar(currentSearchStatus);

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const newStatus = checked ? 'open' : 'closed';
    currentSearchStatus(newStatus);
    currentSearchVariables({
      text: formatSearchIssuesQuery(currentInput, newStatus),
      first: SEARCH_LIMIT,
      last: null,
      after: null,
      before: null,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}
    >
      <FormControlLabel
        color={'primary'}
        control={
          <Switch
            checked={currentStatus === 'open'}
            onChange={handleStatusChange}
          />
        }
        label={
          <Typography variant={'body1'} color={'primary'}>
            {currentStatus.toUpperCase()}
          </Typography>
        }
      />
      <SearchBar />
    </Box>
  );
};

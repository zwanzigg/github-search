import * as React from 'react';
import { ReactElement } from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import { SwitchIssueStatus } from './SwitchIssueStatus';

export const SearchContainer = (): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}
    >
      <SwitchIssueStatus />
      <SearchBar />
    </Box>
  );
};

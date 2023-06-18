import React, { ReactElement } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useReactiveVar } from '@apollo/client';
import {
  currentSearchInput,
  currentSearchStatus,
  currentSearchVariables,
  SEARCH_LIMIT,
} from '../common/constants';
import { formatSearchIssuesQuery } from '../common/utils';

export const SearchBar = (): ReactElement => {
  const currentInput = useReactiveVar(currentSearchInput);
  const currentStatus = useReactiveVar(currentSearchStatus);

  const triggerSearch = () => {
    currentSearchVariables({
      text: formatSearchIssuesQuery(currentInput, currentStatus),
      first: SEARCH_LIMIT,
      last: null,
      after: null,
      before: null,
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || '';
    currentSearchInput(value);
  };
  return (
    <Box style={{ width: '100%' }}>
      <TextField
        id="filled-basic"
        variant="filled"
        color="primary"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={triggerSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handleInputChange}
        label="Search issues"
        sx={{
          width: '100%',
          margin: '10px auto',
        }}
        onKeyDown={(ev: React.KeyboardEvent<HTMLDivElement>) => {
          if (ev?.key === 'Enter') {
            ev.preventDefault();
            triggerSearch();
          }
        }}
      />
    </Box>
  );
};

export default SearchBar;

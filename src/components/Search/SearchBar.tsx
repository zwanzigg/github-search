import React, { ReactElement } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useReactiveVar } from '@apollo/client';
import {
  DEFAULT_SEARCH_VARIABLES,
  reactiveCurrentSearchInput,
  reactiveCurrentSearchStatus,
  reactiveCurrentSearchVariables,
} from '../../common/constants';
import { formatSearchIssuesQuery } from '../../common/utils';

export const SearchBar = (): ReactElement => {
  const currentSearchInput = useReactiveVar(reactiveCurrentSearchInput);
  const currentSearchStatus = useReactiveVar(reactiveCurrentSearchStatus);

  const triggerSearch = () => {
    reactiveCurrentSearchVariables({
      ...DEFAULT_SEARCH_VARIABLES,
      text: formatSearchIssuesQuery(currentSearchInput, currentSearchStatus),
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || '';
    reactiveCurrentSearchInput(value);
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
        FormHelperTextProps={{
          style: {
            margin: 0,
          },
        }}
        helperText="Press 'Enter' to search"
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

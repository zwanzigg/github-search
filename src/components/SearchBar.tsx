import React, { FC, ReactElement } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar: FC<{
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerSearch: () => void;
}> = ({ triggerSearch, handleInput }): ReactElement => {
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
        onChange={handleInput}
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

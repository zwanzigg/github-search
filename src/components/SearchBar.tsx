import React, { FC, ReactElement } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar: FC<{
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnter: () => void;
}> = ({ handleEnter, handleInput }): ReactElement => {
  return (
    <Box style={{ width: '100%' }}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleEnter}>
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
        onKeyPress={(ev: React.KeyboardEvent<HTMLDivElement>) => {
          if (ev?.key === 'Enter') {
            ev.preventDefault();
            handleEnter();
          }
        }}
      />
    </Box>
  );
};

export default SearchBar;

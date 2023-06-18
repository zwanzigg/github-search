import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { FC } from 'react';

export const User: FC<{ username: string }> = ({ username }) => {
  return (
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
  );
};

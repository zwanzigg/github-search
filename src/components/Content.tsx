import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { IssuesContainer } from './IssuesContainer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export const Content: FC<{ username: string }> = ({ username }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3" style={{ margin: '20px auto' }}>
          You logged in as ${username}
        </Typography>
        <Grid container spacing={2}>
          <IssuesContainer />
        </Grid>
      </Box>
    </>
  );
};

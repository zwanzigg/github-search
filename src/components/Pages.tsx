import React, { ReactElement } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Alert, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { LinearLoader } from './LinearLoader';
import { PaperWrap } from './styled/PaperWrap';
import { LOGIN_QUERY } from '../queries/login.query';
import { ContentContainer } from './ContentContainer';

export const Pages = (): ReactElement => {
  const [login, { data, loading, error }] = useLazyQuery(LOGIN_QUERY);

  const username = data?.viewer?.login;
  return (
    <Grid xs={12}>
      {loading ? (
        <LinearLoader />
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : (
        <>
          {username ? (
            <ContentContainer username={username} />
          ) : (
            <PaperWrap>
              <Button onClick={() => login()}>LOGIN</Button>
            </PaperWrap>
          )}
        </>
      )}
    </Grid>
  );
};

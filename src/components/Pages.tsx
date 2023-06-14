import React, { ReactElement } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Alert, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { LinearLoader } from './LinearLoader';
import { ContentContainer } from './styled/ContentContainer';
import { LOGIN_QUERY } from '../queries/login.query';
import { Content } from './Content';

export const Pages = (): ReactElement => {
  const [login, { data, loading, error }] = useLazyQuery(LOGIN_QUERY);

  const username = data?.viewer?.login;
  return (
    <Grid xs={12}>
      <ContentContainer>
        {loading ? (
          <LinearLoader />
        ) : error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <>
            {username ? (
              <Content username={username} />
            ) : (
              <Button onClick={() => login()}>LOGIN</Button>
            )}
          </>
        )}
      </ContentContainer>
    </Grid>
  );
};

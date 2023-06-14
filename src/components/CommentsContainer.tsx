import { Typography } from '@mui/material';
import { ContentContainer } from './styled/ContentContainer';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import { SearchNodes } from '../common/types';

export const CommentsContainer: FC<{
  data: SearchNodes;
}> = ({ data }): ReactElement => {
  return (
    <ContentContainer>
      <>
        <Typography variant="h6" component="div">
          Comments Presented: {0} of {10}
        </Typography>
      </>
    </ContentContainer>
  );
};

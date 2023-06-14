import { Typography } from '@mui/material';
import { PaperWrap } from './styled/PaperWrap';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import { SearchNodes } from '../common/types';

export const CommentsContainer: FC<{
  data: SearchNodes;
}> = ({ data }): ReactElement => {
  return (
    <PaperWrap>
      <>
        <Typography variant="h6" component="div">
          Comments Presented: {0} of {10}
        </Typography>
      </>
    </PaperWrap>
  );
};

import React, { FC, ReactElement } from 'react';
import { Stack } from '@mui/system';
import { Paper, Box, Typography } from '@mui/material';
import { IssuesNode } from '../common/types';

export const IssuesList: FC<{
  list: IssuesNode[];
}> = ({ list }): ReactElement => {
  return (
    <Box>
      <Stack
        spacing={2}
        sx={{
          overflow: 'auto',
          maxHeight: 500,
        }}
      >
        {list.map((item: IssuesNode) =>
          item.id ? (
            <Paper
              key={item.id}
              sx={{
                textAlign: 'left',
              }}
            >
              <Typography>
                <strong>Title:</strong> {item.title}
              </Typography>
              <Typography>
                <strong>Author:</strong> {item.author?.login}
              </Typography>
              <Typography>
                <strong>Body:</strong> {item.body}
              </Typography>
              <Typography>
                <strong>Created at:</strong> {item.createdAt.toString()}
              </Typography>
            </Paper>
          ) : null,
        )}
      </Stack>
    </Box>
  );
};

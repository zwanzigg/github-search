import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import List from '@mui/material/List';
import { ListItem, Paper } from '@mui/material';
import * as React from 'react';
import { ReactElement, FC } from 'react';

export const CommentsItem: FC<{ bodyHTML: string }> = ({
  bodyHTML,
}): ReactElement => {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      }
    >
      <List component="div" disablePadding>
        <Paper
          sx={{
            textAlign: 'left',
            padding: '10px 20px',
            backgroundColor: '#0000000f',
            marginTop: '10px',
            borderRadius: '7px',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: bodyHTML.toString() }} />
        </Paper>
      </List>
    </ListItem>
  );
};

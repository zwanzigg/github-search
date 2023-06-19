import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import List from '@mui/material/List';
import { Avatar, ListItem, ListItemAvatar, Paper } from '@mui/material';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import { NodeAuthor } from '../../common/types';
import ListItemText from "@mui/material/ListItemText";

export const CommentsItem: FC<{ bodyHTML: string; author: NodeAuthor }> = ({
  bodyHTML,
  author,
}): ReactElement => {
  return (
    <ListItem disableGutters>
      <List component="div" disablePadding sx={{ display: 'flex' }}>


        <ListItemAvatar>
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt={author.login}
            src={author.avatarUrl}
          />
        </ListItemAvatar>
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
          <ListItemText secondary={`@${author.login}`} />
        </Paper>
      </List>
    </ListItem>
  );
};

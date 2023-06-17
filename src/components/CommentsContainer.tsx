import { ListItem, Typography } from '@mui/material';
import { PaperWrap } from './styled/PaperWrap';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import { IssuesCommentsNode, SearchCommentsResult } from '../common/types';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

export const CommentsContainer: FC<{
  comments: SearchCommentsResult;
}> = ({ comments }): ReactElement => {
  const commentsNodes = comments.nodes as IssuesCommentsNode[];
  return (
    <PaperWrap>
      <>
        <Typography variant="h6" component="div">
          Comments Presented: {0} of {comments.totalCount}
        </Typography>
      </>
      <List
        sx={{
          width: '100%',
          height: 300,
          overflow: 'scroll',
          bgcolor: 'background.paper',
        }}
      >
        {commentsNodes.map((item) => (
          <ListItem
            key={item.id}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemText primary={item.body} />
          </ListItem>
        ))}
      </List>
    </PaperWrap>
  );
};

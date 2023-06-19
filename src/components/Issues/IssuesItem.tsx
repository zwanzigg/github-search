import * as React from 'react';
import { FC, ReactElement } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Avatar, Box, ListItemAvatar, Paper, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { IssuesNode } from '../../common/types';
import { useReactiveVar } from '@apollo/client';
import { reactiveCurrentIssueId } from '../../common/constants';

export const NestedList: FC<{
  item: IssuesNode;
  handleOpenIssue: (id: string) => void;
}> = ({ item, handleOpenIssue }): ReactElement => {
  const currentIssueId = useReactiveVar(reactiveCurrentIssueId);

  const isOpened = item.id === currentIssueId;
  return (
    <>
      <ListItemButton
        onClick={() => handleOpenIssue(item.id)}
        style={{
          backgroundColor: isOpened ? '#0000000f' : '#fff',
          borderRadius: '7px',
          marginTop: '20px',
        }}
      >
        <ListItemAvatar style={{ marginRight: '10px' }}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt={item.author.login}
            src={item.author.avatarUrl}
          />
        </ListItemAvatar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'column',
            marginRight: '10px',
            width: '100%',
          }}
        >
          <Typography>
            <strong>{item.title}</strong>
          </Typography>
          <ListItemText secondary={'@' + item.author.login} />
          <Typography variant="caption">{'ID=' + item.id}</Typography>
        </Box>
        {isOpened ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Paper
            key={item.id}
            sx={{
              textAlign: 'left',
              padding: '10px 20px',
              backgroundColor: '#0000000f',
              marginTop: '10px',
              borderRadius: '7px',
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: item.bodyHTML.toString() }}
            />
          </Paper>
        </List>
      </Collapse>
    </>
  );
};

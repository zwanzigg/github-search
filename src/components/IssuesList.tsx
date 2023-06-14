import React, { FC, ReactElement, useEffect } from 'react';
import { Box, List } from '@mui/material';
import { IssuesNode } from '../common/types';
import { NestedList } from './IssuesItem';

export const IssuesList: FC<{
  list: IssuesNode[];
}> = ({ list }): ReactElement => {
  const [openedId, setOpenedId] = React.useState('');

  const handleOpenIssue = (id: string) => {
    setOpenedId(openedId === id ? '' : id);
  };

  useEffect(() => {
    setOpenedId('');
  }, [list]);

  return (
    <Box>
      <List
        sx={{
          width: '100%',
          backgroundColor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {list.map((item: IssuesNode) =>
          item.id ? (
            <NestedList
              key={item.id}
              handleOpenIssue={handleOpenIssue}
              openedId={openedId}
              item={item}
            />
          ) : null,
        )}
      </List>
    </Box>
  );
};

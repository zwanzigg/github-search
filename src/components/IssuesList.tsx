import React, { FC, ReactElement, useEffect } from 'react';
import { Box, List } from '@mui/material';
import { IssuesNode } from '../common/types';
import { NestedList } from './IssuesItem';
import { currentIssueId } from '../common/constants';

export const IssuesList: FC<{
  list: IssuesNode[];
}> = ({ list }): ReactElement => {
  const handleOpenIssue = (id: string) => {
    const newId = id === currentIssueId() ? '' : id;
    currentIssueId(newId);
  };
  //
  // useEffect(() => {
  //   currentIssueId('');
  // }, [list]);

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
              item={item}
            />
          ) : null,
        )}
      </List>
    </Box>
  );
};

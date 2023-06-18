import React, { ReactElement, useEffect } from 'react';
import { Box, List } from '@mui/material';
import { IssuesNode } from '../common/types';
import { NestedList } from './IssuesItem';
import { currentIssueId, currentSearchVariables } from '../common/constants';
import { ISSUES_QUERY } from '../queries/issues.query';
import { useApolloClient, useReactiveVar } from '@apollo/client';
import { filterOutNotIssues } from '../common/utils';

export const IssuesList = (): ReactElement => {
  const currentVariables = useReactiveVar(currentSearchVariables);

  const handleOpenIssue = (id: string) => {
    const newId = id === currentIssueId() ? '' : id;
    currentIssueId(newId);
  };
  const client = useApolloClient();
  const cachedData = client.readQuery({
    query: ISSUES_QUERY,
    variables: currentVariables,
  });
  const list: IssuesNode[] = filterOutNotIssues(cachedData?.search?.nodes);

  useEffect(() => {
    currentIssueId('');
  }, [list[0]?.id]);

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

import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { Box, List } from '@mui/material';
import { IssuesNode } from '../../common/types';
import { NestedList } from './IssuesItem';
import {
  reactiveCurrentIssueId,
  reactiveCurrentSearchVariables,
} from '../../common/constants';
import { ISSUES_QUERY } from '../../queries/issues.query';
import { useApolloClient, useReactiveVar } from '@apollo/client';
import { filterOutNotIssues } from '../../common/utils';

export const IssuesList = (): ReactElement => {
  const currentVariables = useReactiveVar(reactiveCurrentSearchVariables);
  const currentIssueId = useReactiveVar(reactiveCurrentIssueId);

  const client = useApolloClient();
  const cachedData = client.readQuery({
    query: ISSUES_QUERY,
    variables: currentVariables,
  });

  const handleOpenIssue = useCallback(
    (id: string) => {
      const newId = id === currentIssueId ? '' : id;
      reactiveCurrentIssueId(newId);
    },
    [currentIssueId],
  );
  const list: IssuesNode[] = useMemo(
    () => filterOutNotIssues(cachedData?.search?.nodes),
    [cachedData?.search?.nodes[0]?.id],
  );

  useEffect(() => {
    reactiveCurrentIssueId('');
  }, [list[0]?.id]);

  return (
    <Box>
      <List
        sx={{
          width: '100%',
          backgroundColor: 'background.paper',
        }}
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

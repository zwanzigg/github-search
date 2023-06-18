import * as React from 'react';
import { FC, ReactElement } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { ISSUES_QUERY } from '../queries/issues.query';
import { SearchIssuesResult } from '../common/types';
import {
  currentSearchVariables,
  DEFAULT_ISSUES_SEARCH_RESULTS,
} from '../common/constants';
import { Content } from './Content';

export const ContentContainer: FC<{ username: string }> = ({
  username,
}): ReactElement => {
  const currentVariables = useReactiveVar(currentSearchVariables);
  const {
    loading,
    error,
    data = DEFAULT_ISSUES_SEARCH_RESULTS,
  } = useQuery<SearchIssuesResult>(ISSUES_QUERY, {
    variables: currentVariables,
  });

  const notReLoading = loading && !data?.search?.nodes.length;
  return (
    <Content
      username={username}
      data={data}
      loading={notReLoading}
      error={error}
    />
  );
};

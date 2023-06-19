import { Typography } from '@mui/material';
import { PaperWrap } from '../styled/PaperWrap';
import * as React from 'react';
import { FC, ReactElement, useCallback } from 'react';
import { IssuesCommentsNode, SearchIssuesResult } from '../../common/types';
import List from '@mui/material/List';
import { findCommentsForCurrentIssue } from '../../common/utils';
import {
  reactiveCurrentIssueId,
  reactiveCurrentSearchVariables,
} from '../../common/constants';
import { useReactiveVar } from '@apollo/client';
import LoadingButton from '@mui/lab/LoadingButton';
import { CommentsItem } from './CommentsItem';

export const CommentsContainer: FC<{
  loading: boolean;
  data: SearchIssuesResult;
}> = ({ loading, data }): ReactElement => {
  const currentIssueId = useReactiveVar(reactiveCurrentIssueId);

  const comments = findCommentsForCurrentIssue(data, currentIssueId);

  const commentsNodes = comments.nodes as IssuesCommentsNode[];

  const totalCommentsCount = comments.totalCount;
  const hasNextPage = comments.pageInfo.hasNextPage;
  const endCursor = comments.pageInfo.endCursor;
  const currentCommentsLength = commentsNodes.length;

  const loadMore = useCallback(
    () =>
      reactiveCurrentSearchVariables({
        ...reactiveCurrentSearchVariables(),
        comments_after: endCursor,
      }),
    [endCursor],
  );
  return (
    <PaperWrap>
      <>
        <Typography variant="h6" component="div">
          Comments Presented: {currentCommentsLength} of {totalCommentsCount}
        </Typography>
      </>
      <List
        sx={{
          width: '100%',
          height: 400,
          overflow: 'scroll',
          bgcolor: 'background.paper',
        }}
        aria-labelledby="nested-list-subheader"
        aria-label={'comments list'}
        subheader={
          <>
            {currentIssueId ? (
              <Typography variant="caption">
                Issue ID={currentIssueId}
              </Typography>
            ) : null}
          </>
        }
      >
        {commentsNodes.map((item) => (
          <CommentsItem key={item.id} bodyHTML={item.bodyHTML} />
        ))}
        {hasNextPage ? (
          <LoadingButton
            loading={loading}
            variant="outlined"
            onClick={loadMore}
          >
            More
          </LoadingButton>
        ) : null}
      </List>
    </PaperWrap>
  );
};

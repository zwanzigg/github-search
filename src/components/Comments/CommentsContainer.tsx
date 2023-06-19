import { ListItem, Paper, Typography } from '@mui/material';
import { PaperWrap } from '../styled/PaperWrap';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import { IssuesCommentsNode } from '../../common/types';
import List from '@mui/material/List';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { getCommentsForCurrentIssue } from '../../common/utils';
import {
  reactiveCurrentIssueId,
  reactiveCurrentSearchVariables,
} from '../../common/constants';
import { useApolloClient, useReactiveVar } from '@apollo/client';
import LoadingButton from '@mui/lab/LoadingButton';
import { ISSUES_QUERY } from '../../queries/issues.query';
import { CommentsItem } from './CommentsItem';

export const CommentsContainer: FC<{
  loading: boolean;
}> = ({ loading }): ReactElement => {
  const issueId = useReactiveVar(reactiveCurrentIssueId);
  const currentSearchVariables = useReactiveVar(reactiveCurrentSearchVariables);
  const client = useApolloClient();
  const data = client.readQuery({
    query: ISSUES_QUERY,
    variables: currentSearchVariables,
  });

  const comments = getCommentsForCurrentIssue(data, issueId);
  const commentsNodes = comments.nodes as IssuesCommentsNode[];

  const totalCommentsCount = comments.totalCount;
  const hasNextPage = comments.pageInfo.hasNextPage;
  const endCursor = comments.pageInfo.endCursor;
  const currentCommentsLength = commentsNodes.length;
  const loadMore = () => {
    reactiveCurrentSearchVariables({
      ...currentSearchVariables,
      comments_after: endCursor,
    });
  };
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
            {issueId ? (
              <Typography variant="caption">Issue ID={issueId}</Typography>
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

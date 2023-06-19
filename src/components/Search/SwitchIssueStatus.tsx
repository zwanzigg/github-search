import { ReactElement } from 'react';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import * as React from 'react';
import { useReactiveVar } from '@apollo/client';
import {
  DEFAULT_SEARCH_VARIABLES,
  reactiveCurrentSearchInput,
  reactiveCurrentSearchStatus,
  reactiveCurrentSearchVariables,
} from '../../common/constants';
import { formatSearchIssuesQuery } from '../../common/utils';

export const SwitchIssueStatus = (): ReactElement => {
  const currentSearchInput = useReactiveVar(reactiveCurrentSearchInput);
  const currentSearchStatus = useReactiveVar(reactiveCurrentSearchStatus);

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const newStatus = checked ? 'open' : 'closed';
    reactiveCurrentSearchStatus(newStatus);
    reactiveCurrentSearchVariables({
      ...DEFAULT_SEARCH_VARIABLES,
      text: formatSearchIssuesQuery(currentSearchInput, newStatus),
    });
  };

  return (
    <FormControlLabel
      color={'primary'}
      control={
        <Switch
          checked={currentSearchStatus === 'open'}
          onChange={handleStatusChange}
        />
      }
      label={
        <Typography variant={'body1'} color={'primary'}>
          {currentSearchStatus.toUpperCase()}
        </Typography>
      }
    />
  );
};

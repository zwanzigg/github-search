import * as React from 'react';
import { FC, ReactElement } from 'react';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import { IssueStatus } from '../common/types';

export const SearchBarContainer: FC<{
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  triggerSearch: () => void;
  handleStatusChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  status: IssueStatus;
}> = ({
  handleInput,
  triggerSearch,
  handleStatusChange,
  status,
}): ReactElement => {
  return (
    <>
      <FormControlLabel
        color={'primary'}
        control={
          <Switch checked={status === 'open'} onChange={handleStatusChange} />
        }
        label={
          <Typography variant={'body1'} color={'primary'}>
            {status.toUpperCase()}
          </Typography>
        }
      />
      <SearchBar handleInput={handleInput} triggerSearch={triggerSearch} />
    </>
  );
};

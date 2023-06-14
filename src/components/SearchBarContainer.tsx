import { FC, ReactElement } from 'react';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import SearchBar from './SearchBar';
import { ContentContainer } from './styled/ContentContainer';
import * as React from 'react';
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
    <ContentContainer>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              checked={status === 'open'}
              onChange={handleStatusChange}
            />
          }
          label={status.toUpperCase()}
        />
      </FormGroup>
      <SearchBar handleInput={handleInput} triggerSearch={triggerSearch} />
    </ContentContainer>
  );
};

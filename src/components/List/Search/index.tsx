import React, { ChangeEvent } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import { FormSearch, ButtonStyle } from './styles';

interface SearchProps {
  onChangeInput: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleButton: () => void;
  value?: string;
  buttonTitle?: string;
  inputPlaceholder?: string;
}

const Search = ({ value, onChangeInput, buttonTitle, handleButton, inputPlaceholder }: SearchProps) => {
  return (
    <div>
      <FormSearch noValidate autoComplete="off">
        <FormControl variant="outlined" size="small" >
          <InputLabel htmlFor="search-input">{inputPlaceholder ?? "Digite para pesquisar"}</InputLabel>
          <OutlinedInput
            id="search-input"
            value={value}
            onChange={onChangeInput}
            onKeyDown={(event: any) => event.keyCode === 13 && event.preventDefault()}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={155}
          />
        </FormControl>

        <ButtonStyle onClick={handleButton}>{buttonTitle}</ButtonStyle>
      </FormSearch>
    </div>
  );
}

export default React.memo(Search);

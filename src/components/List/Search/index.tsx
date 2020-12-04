import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React from 'react';

import { FormSearch, ButtonStyle } from './styles';

interface SearchProps {
  onChangeInput: () => void;
  value: string;
  buttonTitle: string;
  handleButton: () => void;
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

export default Search;

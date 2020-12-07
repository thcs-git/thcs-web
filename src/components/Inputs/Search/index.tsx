import React, { useState, Props } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import { FormSearch } from './styles';

interface ISearchInput extends Props<any> {
  label: string;
};

const SearchInput = (props: ISearchInput) => {
  const [search, setSearch] = useState('');

  const { label } = props;

  return (
    <FormSearch noValidate autoComplete="off">
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel htmlFor="search-input">{label}</InputLabel>
        <OutlinedInput
          id="search-input"
          value={search}
          onChange={(element) => setSearch(element.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                <SearchOutlined style={{ fill: `var(--primary)` }} />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={label.length * 7.8}
        />
      </FormControl>
    </FormSearch>
  );
}

export default React.memo(SearchInput);

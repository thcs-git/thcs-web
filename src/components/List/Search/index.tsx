import React, { ChangeEvent } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import { FormSearch, ButtonStyle } from './styles';
import ButtonSwitches from "../../Button/ButtonSwitches";

interface SearchProps {
  onChangeInput: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleButton: () => void;
  value?: string;
  buttonTitle?: string;
  inputPlaceholder?: string;
  switches?: boolean;
  setTabIndex?: any;
}

const Search = ({ value, onChangeInput, buttonTitle, handleButton, inputPlaceholder, switches, setTabIndex }: SearchProps) => {
  return (
    <div>
      <FormSearch noValidate autoComplete="off">
        <FormControl variant="outlined" size="small" >
          <InputLabel htmlFor="search-input" >{inputPlaceholder = inputPlaceholder}</InputLabel>
          <OutlinedInput
            id="search-input"
            value={value}
            type="search"
            onChange={onChangeInput}
            onKeyDown={(event: any) => event.keyCode === 13 && event.preventDefault()}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={390}
          />
        </FormControl>
        {switches && (
          <ButtonSwitches
            setTabIndex={setTabIndex}
          />
        )}
        {buttonTitle && (
          <ButtonStyle onClick={handleButton}>{buttonTitle}</ButtonStyle>
        )}

      </FormSearch>
    </div>
  );
}

export default React.memo(Search);

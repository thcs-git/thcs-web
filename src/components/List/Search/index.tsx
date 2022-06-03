import React, { ChangeEvent } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

import { FormSearch, ButtonStyle } from "./styles";
import ButtonSwitches from "../../Button/ButtonSwitches";

interface SearchProps {
  onChangeInput: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleButton: () => void;
  value?: string;
  buttonTitle?: string;
  inputPlaceholder?: string;
  switches?: boolean;
  setTabIndex?: any;
  onKeyEnter?: (e: any) => void;
  onClickSearch?: (e: any) => void;
}

const Search = ({
  value,
  onChangeInput,
  buttonTitle,
  handleButton,
  inputPlaceholder,
  switches,
  setTabIndex,
  onKeyEnter,
  onClickSearch,
}: SearchProps) => {
  return (
    <div>
      <FormSearch noValidate autoComplete="off">
        <FormControl variant="outlined" size="small" color="secondary">
          <InputLabel htmlFor="search-input">
            {(inputPlaceholder = inputPlaceholder)}
          </InputLabel>
          <OutlinedInput
            color="secondary"
            id="search-input"
            value={value}
            type="search"
            onChange={onChangeInput}
            onKeyDown={onKeyEnter}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  color="secondary"
                  onClick={onClickSearch}
                  sx={{
                    cursor: "pointer",
                    "& svg, path": { cursor: "pointer" },
                  }}
                >
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
            label={inputPlaceholder}
            // labelWidth={390}
          />
        </FormControl>
        {buttonTitle && (
          <ButtonStyle onClick={handleButton}>{buttonTitle}</ButtonStyle>
        )}
      </FormSearch>
      {switches && <ButtonSwitches setTabIndex={setTabIndex} />}
    </div>
  );
};

export default React.memo(Search);

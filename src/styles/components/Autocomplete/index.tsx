import { HTMLProps } from "react";
import styled, {
  css,
  StyledComponent,
  StyledComponentProps,
} from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";

const AutoCompleteInput = styled(Autocomplete)`
  background: var(--white);
`;

export default AutoCompleteInput;

import { HTMLProps } from 'react';
import styled, { css, StyledComponent, StyledComponentProps } from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AutoCompleteInput = styled(Autocomplete)`
  background: var(--white);
`;

export default AutoCompleteInput;

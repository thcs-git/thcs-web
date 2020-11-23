import styled from 'styled-components';
import { Select } from '@material-ui/core';

export const FormTitle = styled.h3`
  color: var(--primary);
  margin-bottom: 20px;
`;

export const SelectComponent = styled(Select)`
  background: var(--white);
  margin-right: 12px;

  .MuiSelect-select:focus {
    background: var(--white);
  }
`;

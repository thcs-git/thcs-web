import styled from 'styled-components';
import { Chip } from '@material-ui/core';

export const ChipComponent = styled(Chip)`
  background: var(--secondary);
  color: var(--white);

  margin: 0 10px 10px 0;

  &:focus {
    background: var(--secondary);
  }
`;

export const ChipList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 20px;
`;

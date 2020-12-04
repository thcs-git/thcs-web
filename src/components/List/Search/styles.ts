import styled from 'styled-components';

import Button from '../../../styles/components/Button';

export const FormSearch = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
  font-style: italic;
  background: #FAFAFA;

  > div {
    width: 50%;
    background: #FFFFFF;
  }
`;

export const ButtonStyle = styled(Button).attrs({
  background: 'success',
  variant: 'contained',
})`
  width: 180px;
  margin-left: 10px;
`;

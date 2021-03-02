import styled from 'styled-components';
import { Accordion } from '@material-ui/core';

import { ReactComponent as SollarLogo } from '../../assets/img/marca-sollar-branca.svg';

export const AccordionMenu = styled(Accordion)`
  box-shadow: none;
  font-family: 'Open Sans', sans-serif;

  p {
    display: flex;
  }

  svg {
    margin-right: 10px
  }
`;

export const Logo = styled(SollarLogo)`
  margin: 10px 15px;
`;

export const UserContent = styled.div`
  padding: 10px;
  margin: 20px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: 0.2s linear;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100px;

    word-wrap: break-word;
  }

  &.hide > div {
    display: none;
  }

  &.hide > svg {
    transform: scale(.7);
  }

  & > svg {
    margin-bottom: 10px;
    width: 60px;
    height: 60px;

    transition: 0.2s linear;
  }

  & div > h3 {
    color: #fff !important;
  }
`;


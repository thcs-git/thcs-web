import styled from 'styled-components';
import {Accordion} from '@material-ui/core';

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


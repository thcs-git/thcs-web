import styled from "styled-components";
import { Accordion } from "@mui/material";

import { ReactComponent as SollarLogo } from "../../assets/img/marca-sollar-branca.svg";

export const AccordionMenu = styled(Accordion)`
  box-shadow: none;
  font-family: "Open Sans", sans-serif;

  p {
    display: flex;
  }

  svg {
    margin-right: 10px;
  }
`;

export const Logo = styled(SollarLogo)`
  margin: 10px 30px;
`;

export const UserContent = styled.div`
  //padding: 14px;
  margin: 20px auto 0;

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
    transform: scale(0.7);
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

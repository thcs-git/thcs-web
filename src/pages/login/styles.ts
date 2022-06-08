import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ReactComponent as HomeIcon } from "../../assets/img/marca-sollar-azul.svg";
import Button, { ButtonProps } from "@mui/material/Button";

interface IButton extends ButtonProps {
  background?: any;
  colorText?: any;
}

export const ContainerLogin = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const WelcomeTextWrapper = styled.div`
  width: 100%;
`;

export const HomeIconLogo = styled(HomeIcon)`
  margin-bottom: 8px;
  height: 300px;
  width: 300px;
`;

export const LogoText = styled(Typography)`
  font-size: 26px;
  font-weight: bold;
  color: #0899ba;
  margin-left: 10px;
`;

export const TextGray = styled.p`
  font-size: 12px;
  color: #222;
`;
export const TextBlue = styled.a`
  font-size: 14px;
  color: #000083;
  cursor: pointer;
  & :hover {
    color: #4949fe;
  }
`;
export const ButtonGreen = styledMui(Button)<IButton>(({ theme }) => ({
  backgroundColor: "var(--success)",
  color: "var(--white)",
  "&:hover": { backgroundColor: "#4fc66ae3" },
}));

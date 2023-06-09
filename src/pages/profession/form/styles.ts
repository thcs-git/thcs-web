import styled from "styled-components";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ReactComponent as HomeIcon } from "../../assets/img/marca-sollar-azul.svg";

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
  color: #666;
`;

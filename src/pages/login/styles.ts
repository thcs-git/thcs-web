import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import  { ReactComponent as HomeIcon } from '../../assets/img/marca-sollar-home.svg';

export const ContainerLogin = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const WelcomeTextWrapper = styled.div`
  width: 100%;
  padding: 30px 0 0;
`;

export const HomeIconLogo = styled(HomeIcon)`
  margin-bottom: 8px;
`;

export const LogoText = styled(Typography)`
  font-size: 26px;
  font-weight: bold;
  color: #0899BA;
  margin-left: 10px;
`;

export const TextGray = styled.p`
  font-size: 12px;
  color: #666;
`;

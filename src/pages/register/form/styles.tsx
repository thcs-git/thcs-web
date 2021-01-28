import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import  { ReactComponent as HomeIcon } from '../../../assets/img/marca-sollar-azul.svg';

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
  color: #0899BA;
  margin-left: 10px;
`;
export const FormControl = styled.div`
margin-bottom:40px;`;
export const TextGray = styled.p`
  font-size: 14px;
  color: #666;
`;
export const FormGroupSection = styled.div`
  margin-bottom: 40px;
`;
export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y:"scroll";

  height: calc(100vh - 96px);
`;
export const TextBlue = styled.a`
  font-size: 14px;
  color: #0899BA;
`;


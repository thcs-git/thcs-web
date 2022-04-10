import styled from 'styled-components';
import { Container } from '@material-ui/core'

export const ContainerComponent = styled(Container)`
  display: flex !important;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //width: 100vw;
  //height: 100vh;
  text-align: center;

  & .sollar-logo {
    width: 5.238rem;
    height: 4.647rem;
  }

  & h3 {
    font-size: 2rem;
  }

  & p {
    text-align: center;
    margin-bottom: 20px;
  }

  & .illustration-container {
    margin: 3rem auto;
  }

  & .illustration-container > svg {
    width: 100%;
  }
`;

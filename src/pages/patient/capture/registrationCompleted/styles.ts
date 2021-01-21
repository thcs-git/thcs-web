import styled from 'styled-components';
import Box from '@material-ui/core/Box';

export const Container = styled.div`

`;

export const BoxCustom = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
  margin: 20px 10%;
`;

export const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-bottom: 30px;
  }

  & > h1 {
    margin-bottom: 15px;
  }

  > p {
    padding: 0px 23%;
    text-align: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  > div {
    margin-left: 20px;
  }

  h5 {
    color: #333333;
  }
  p {
    color: #666666;
    font-size: 12px;
  }
`;

export const ButtonsContainer = styled.div`
  button:first-of-type {
    margin-right: 14px;
  }
`;

export const PatientWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

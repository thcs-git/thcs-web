import styled from 'styled-components';
import {ReactComponent as  femaleIcon} from "../../../assets/img/ionic-md-female.svg";
import {ReactComponent  as maleIcon} from "../../../assets/img/icon-male.svg";

export const PatientResume = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 30px;
  background: var(--white);
  border-radius: 8px;
  border: 1px solid #ccc;

  padding: 15px 15px 15px 10px;
  margin-bottom: 30px;
`;

export const PatientResumeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  .title {
    font-weight: bold;
  }

  .subTitle {
    color: var(--gray-dark);
  }

  .patientIcon {
    padding: 15px;

    svg {
      fill: var(--secondary);
      width: 54px;
      height: 54px;
    }
  }
`;

export const PatientData = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FemaleIconLogo = styled(femaleIcon)`
  height: 15px;
  width: 15px;
`;

export const MaleIconLogo = styled(maleIcon)`
  height: 15px;
  width: 15px;
`;


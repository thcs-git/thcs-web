import styled from 'styled-components';
import { Stepper, Step } from '@material-ui/core';

export const StepTitle = styled.h3`
  margin-bottom: 30px;
`;

export const StepperComponent = styled(Stepper)`
  margin-bottom: 20px;
  background: none;
`;

export const StepComponent = styled(Step)`
  margin-bottom: 20px;
  cursor: pointer;

  .MuiStepIcon-root.MuiStepIcon-active {
    color: var(--secondary);
    cursor: pointer;
  }

  .MuiStepIcon-root.MuiStepIcon-completed {
    color: var(--success);
    cursor: pointer;
  }

`;

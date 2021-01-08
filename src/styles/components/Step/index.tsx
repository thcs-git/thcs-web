import styled from 'styled-components';
import { Stepper, Step } from '@material-ui/core';

export const StepTitle = styled.h3`
  margin-bottom: 30px;
`;

export const StepperComponent = styled(Stepper)`
  margin-bottom: 20px;
`;

export const StepComponent = styled(Step)`
  margin-bottom: 20px;

  .MuiStepIcon-root.MuiStepIcon-active {
    color: var(--secondary);
  }

  .MuiStepIcon-root.MuiStepIcon-completed {
    color: var(--success);
  }

`;

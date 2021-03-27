import styled from 'styled-components';
import { Select, Radio } from '@material-ui/core';

export const FormTitle = styled.h2`
  color: var(--primary);
  margin-bottom: 40px;
`;

export const SelectComponent = styled(Select)`
  background: var(--white);
  margin-right: 12px;

  .MuiSelect-select:focus {
    background: var(--white);
  }
`;

export const QuestionSection = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const QuestionTitle = styled.p`
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const ScoreTotalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ScoreLabel = styled.div``;

export const ScoreTotal = styled.div`
  padding: 10px 20px;
  background: var(--white);

  border-radius: 4px;

  margin-left: 15px;

  font-weight: bold;
  color: var(--primary);
`;

export const FieldContent = styled.div`
  margin-bottom: 25px;
`;

export const RadioComponent = styled(Radio)`
  &.Mui-checked {
    color: var(--secondary);
  }

  &:hover, &.Mui-checked:hover {
    background-color: #0899BA11;
  }
`;

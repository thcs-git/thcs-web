import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import styled from 'styled-components';

export const CardIcon = styled(Card)`
  background-color: #0899BA;
  border-radius: 20px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export const CardTitle = styled(Card)`
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export const BoxCustomFoot = styled(Box)`
  padding-left: 4rem;
`;

export const FeedbackTitle = styled.h2`
  padding-left: 1.25rem;
  padding-top: 0.5rem;
`;

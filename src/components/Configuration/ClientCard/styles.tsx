import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

export const CardIcon = styled(Card)`
  background-color: #0899ba;
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
  margin-bottom: 1rem;
`;

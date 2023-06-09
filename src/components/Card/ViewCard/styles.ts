import styled from "styled-components";
import Card from "@mui/material/Card";
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

export const FeedbackTitle = styled.h3`
  padding-left: 1.25rem;
  padding-top: 0.5rem;
`;

export const WrapperTitleData = styled.div`
  display: flex;
  align-items: center;
  gap: 8.45px;
  font-weight: bold;

  margin: 21.8px 8.45px 7px 22px;
`;

export const WrapperContentData = styled.div`
  margin-left: 44px;
`;

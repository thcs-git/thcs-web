import styled from "styled-components";
import Button from "../../../styles/components/Button";

export const ButtonStyle = styled(Button).attrs({
  background: "success",
  variant: "contained",
})`
  width: 180px;
  margin-left: 10px;
  //margin-bottom: 25px;
`;

export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-end;

  //margin-bottom: 20px;

  button:first-child {
    margin-right: 10px;
  }
`;

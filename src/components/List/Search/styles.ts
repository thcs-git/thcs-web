import styled from "styled-components";

import Button from "../../../styles/components/Button";

export const FormSearch = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-style: italic;
  background: #fafafa;

  > div {
    width: 50%;
    background: #ffffff;
  }
`;

export const ButtonStyle = styled(Button).attrs({
  background: "success",
  variant: "contained",
})`
  width: 200px;
  margin-left: 10px;
`;

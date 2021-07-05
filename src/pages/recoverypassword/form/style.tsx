import styled from "styled-components";
import { ReactComponent as HomeIcon } from "../../../assets/img/marca-sollar-azul.svg";
export const FeedbackContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;
export const FeedbackImage = styled.h1`
  margin-bottom: 1rem;
  margin-top: 1rem;

  & > svg {
    width: 20rem;
    height: 20rem;
  }
`;
export const FeedbackTitle = styled.h1`
  color: var(--primary);
  margin-bottom: 1.063rem;
  font-size: 2.125rem;
`;

export const HomeIconLogo = styled(HomeIcon)`
  margin-bottom: 8px;
  height: 300px;
  width: 300px;
`;

export const FeedbackDescription = styled.p`
  color: var(--black);
  font-weight: bold;
  font-size: .813rem;
  margin-bottom: 1rem;
`;
export const FormControl = styled.div`
margin-bottom:40px;`;
export const FormGroupSection = styled(FormControl)`
  display: block;

  margin-bottom: 30px;
`;

export const FeedbackButtonsContent = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2.25rem;

  & > button:not(:last-child) {
    margin-right: .7rem;
  }
`;

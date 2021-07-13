import styled from 'styled-components';

export const FeedbackUserContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;

export const FeedbackUserImage = styled.h1`
  margin-bottom: 1rem;
  margin-top: 1rem;

  & > svg {
    width: 20rem;
    height: 20rem;
  }
`;

export const FeedbackUserTitle = styled.h1`
  color: var(--primary);
  margin-bottom: 1.063rem;
  font-size: 2.125rem;
`;

export const FeedbackUserDescription = styled.p`
  color: var(--black);
  font-weight: bold;
  font-size: .813rem;
  margin-bottom: 1rem;
`;

export const FeedbackUserButtonsContent = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2.25rem;

  & > button:not(:last-child) {
    margin-right: .7rem;
  }
`;


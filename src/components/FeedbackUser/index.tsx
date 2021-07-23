import React from 'react';

import Button from '../../styles/components/Button';

import { ReactComponent as SuccessImage } from '../../assets/img/ilustracao-avaliacao-concluida.svg';

import { FeedbackUserContent, FeedbackUserImage, FeedbackUserTitle, FeedbackUserDescription, FeedbackUserButtonsContent } from './styles';

interface IProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description: string;
  buttons?: boolean;
  successAction?: Function;
  defaultAction?: Function;
}

export default function FeedbackUserComponent(props: IProps) {

  const handleImage = () => {
    switch (props.type) {
      case 'success':
        return <SuccessImage />;

      default:
        return <SuccessImage />;
    }
  }

  return (
    <FeedbackUserContent>
      <FeedbackUserImage>
        {handleImage()}
      </FeedbackUserImage>

      <FeedbackUserTitle>{props.title}</FeedbackUserTitle>
      <FeedbackUserDescription>{props.description}</FeedbackUserDescription>

      {props.buttons && (
        <FeedbackUserButtonsContent>
          <Button background="success" variant="outlined" onClick={() => props.defaultAction ? props.defaultAction() : undefined}>Dashboard</Button>
        </FeedbackUserButtonsContent>
      )}
    </FeedbackUserContent>
  );
}

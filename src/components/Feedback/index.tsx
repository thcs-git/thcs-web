import React from 'react';

import Button from '../../styles/components/Button';

import { ReactComponent as SuccessImage } from '../../assets/img/ilustracao-avaliacao-concluida.svg';

import { FeedbackContent, FeedbackImage, FeedbackTitle, FeedbackDescription, FeedbackButtonsContent } from './styles';

interface IProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description: string;
  buttons?: boolean;
  successAction?: Function;
  defaultAction?: Function;
}

export default function FeedbackComponent(props: IProps) {

  const handleImage = () => {
    switch (props.type) {
      case 'success':
        return <SuccessImage />;

      default:
        return <SuccessImage />;
    }
  }

  return (
    <FeedbackContent>
      <FeedbackImage>
        {handleImage()}
      </FeedbackImage>

      <FeedbackTitle>{props.title}</FeedbackTitle>
      <FeedbackDescription>{props.description}</FeedbackDescription>

      {props.buttons && (
        <FeedbackButtonsContent>
          <Button background="success" variant="outlined" onClick={() => props.defaultAction ? props.defaultAction() : undefined}>Voltar</Button>
          <Button background="success" onClick={() => props.successAction ? props.successAction() : undefined}>Novo</Button>
        </FeedbackButtonsContent>
      )}
    </FeedbackContent>
  );
}

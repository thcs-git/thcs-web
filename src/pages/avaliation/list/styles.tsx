import styled from "styled-components";
import { Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

interface IListItemStatus {
  active: boolean;
}

interface IListItemCaptureStatus {
  status: string;
}

export const FormSearch = styled.form`
  margin-bottom: 10px;
  font-style: italic;
  background: #fff;
`;

export const List = styled.div`
  margin-bottom: 20px;
`;
export const ListLink = styled(Link)`
  text-decoration: none;
`;

export const ListItem = styled(Card)`
  margin-bottom: 5px;
  transition: 0.3s ease-in-out;
  border: 1px solor #ccc solid;
  border-radius: 4px;

  &:hover {
    background: var(--gray-light);
    transition: 0.2s ease-in-out;
  }
`;

export const ListItemContent = styled(CardContent)`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 4px !important;
`;

export const ListItemStatus = styled.div<IListItemStatus>`
  color: ${(props) => (props.active ? `var(--success)` : `var(--danger)`)};
  font-weight: bold;

  padding: 16px;

  width: 80px;
`;

export const ListItemCaptureStatus = styled.div<IListItemCaptureStatus>`
  color: ${(props) => {
    switch (props.status) {
      case "Aprovado":
        return `var(--success)`;
      case "Recusado":
        return `var(--danger)`;
      case "Aguardando":
        return `var(--yellow)`;
      case "Em Andamento":
        return `var(--purple)`;
      case "Cancelado":
        return `var(--orange)`;
      default:
        return `var(--black)`;
    }
  }};
  display: flex;
  align-items: center;
  justify-items: center;

  & > svg {
    width: 18px;
    margin-right: 7.5px;
  }
`;

export const ListItemTitle = styled.p`
  font-weight: bold;
  font-size: 14px;
`;

export const ListItemSubTitle = styled.p`
  font-size: 12px;
  color: #333333;
`;

export const ButtonsContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CheckListContent = styled.div`
  display: flex;
  flex-direction: row;

  .checklist-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: auto 20px;
  }
`;

export const CaptionList = styled.div`
  & > div.captionItem {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & > div.captionItem svg {
    width: 15px;
    margin-right: 5px;
  }

  & > div.captionItem.recusado > span,
  & > div.captionItem.recusado > svg {
    color: var(--danger);
  }

  & > div.captionItem.aprovado > span,
  & > div.captionItem.aprovado > svg {
    color: var(--success);
  }

  & > div.captionItem.aguardando > span,
  & > div.captionItem.aguardando > svg {
    color: var(--yellow);
  }

  & > div.captionItem.andamento > span,
  & > div.captionItem.andamento > svg {
    color: var(--purple);
  }

  & > div.captionItem.cancelado > span,
  & > div.captionItem.cancelado > svg {
    color: var(--orange);
  }
`;

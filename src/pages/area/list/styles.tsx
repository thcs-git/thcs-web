import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IListItemStatus {
  active: boolean;
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

  padding: 5px;

  width: 80px;
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

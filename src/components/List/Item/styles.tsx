import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

  p.title {
    font-weight: bold;
  }

  p.subtitle {
    color: var(--gray-dark);
  }

  div.listStatus {
    width: 70px;
    font-weight: bold;
    padding: 0 10px;
  }

  div.listStatus.active {
    color: var(--success)
  }

  div.listStatus.inactive {
    color: var(--danger)
  }
`;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { getDayOfTheWeekName } from '../../../helpers/date';

import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';

import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import {
  List,
  ListLink,
  ListItem,
  ListItemContent,
  ListItemStatus,
  ListItemTitle,
  ListItemSubTitle,
  FormSearch,
  ButtonsContent,
} from './styles';

export default function CouncilList() {
  const history = useHistory();

  const [search, setSearch] = useState('');

  const [areas, setAreas] = useState([
    { id: 1, description: 'area 1', supply_day: 7, day_of_the_week: 1, active: true },
    { id: 2, description: 'area 2', supply_day: 7, day_of_the_week: 3, active: false },
  ]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Sidebar>
        <Container>
          <FormTitle>Lista de Áreas</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/area/create/')}
            buttonTitle="Novo"
            value=""
            onChangeInput={() => {}}
          />

          <List>
            {areas.map((area, index) => (
              <ListLink key={index} to={`/area/${area.id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={area.active}>{area.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{area.description}</ListItemTitle>
                      <ListItemSubTitle>Intervalo do abastecimento: {area.supply_day} dia(s), {getDayOfTheWeekName(area.day_of_the_week)}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
        </Container>
      </Sidebar>
    </>
  );
}

import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Checkbox, FormControlLabel, Menu, MenuItem } from '@material-ui/core';
import { Add, CheckCircle, FilterList, MoreVert } from '@material-ui/icons';

import Sidebar from '../../../../components/Sidebar';
import SearchComponent from '../../../../components/List/Search';

import { FormTitle } from '../../../../styles/components/Form';
import { Table, Th, Td } from '../../../../styles/components/Table';

export default function PatientCapture() {
  const history = useHistory();
  const [menuRowOpen, setMenuOpen] = useState(-1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [filterState, setFilterState] = useState([
    {
      label: 'Pedido em andamento',
      checked: false,
    },
    {
      label: 'Pedido aprovado',
      checked: false,
    },
    {
      label: 'Pedido reprovado',
      checked: false,
    }
  ]);

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('anchorEl?.id', event.currentTarget)
  }, [anchorEl])

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl])

  const handleChangeFilter = useCallback((index: number) => {
    let newFilter = [...filterState];

    newFilter[index].checked = !newFilter[index].checked;

    setFilterState(newFilter);
  }, [filterState]);

  // const debounceSearchRequest = debounce(handleChangeInput, 600)

  return (
    <>
      <Sidebar>
        <Container>
          <FormTitle>Captação de Pacientes</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/patient/capture/create/')}
            buttonTitle="Nova captação"
            onChangeInput={() => { }}
          />

          <Table>
            <thead>
              <tr>
                <Th>Paciente</Th>
                <Th>Pedido</Th>
                <Th>Data</Th>
                <Th center>NEAD</Th>
                <Th center>ABEMID</Th>
                <Th center>Socioambiental</Th>
                <Th center>Manutenção</Th>
                <Th center>
                  <Button aria-controls="filter-menu" id="btn_filter-menu" aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <FilterList />
                  </Button>
                  <Menu
                    id="filter-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === 'btn_filter-menu'}
                    onClose={handleCloseRowMenu}
                  >
                    <div style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10, marginTop: 10, color: '#666' }}>
                      <p>Filtrar resultados por</p>
                    </div>
                    {filterState.map((item, index) => (
                      <MenuItem>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item.checked}
                              onChange={() => handleChangeFilter(index)}
                              name={item.label}
                            />
                          }
                          label={item.label}
                        />
                      </MenuItem>
                    ))}
                  </Menu>
                </Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td center><Add /></Td>
                <Td center><Add /></Td>
                <Td center><Add /></Td>
                <Td center><Add /></Td>
                <Td center>
                  <Button aria-controls="simple-menu1" id="btn_simple-menu1" aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert />
                  </Button>
                  <Menu
                    id="simple-menu1"
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === 'btn_simple-menu1'}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem onClick={handleCloseRowMenu}>Profile1</MenuItem>
                    <MenuItem onClick={handleCloseRowMenu}>My account</MenuItem>
                    <MenuItem onClick={handleCloseRowMenu}>Logout</MenuItem>
                  </Menu>

                </Td>
              </tr>
              <tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td center><Add /></Td>
                <Td center><Add /></Td>
                <Td center><Add /></Td>
                <Td center><Add /></Td>
                <Td center>
                  <Button aria-controls="simple-menu2" id="btn_simple-menu2" aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert />
                  </Button>
                  <Menu
                    id="simple-menu2"
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === 'btn_simple-menu2'}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem onClick={handleCloseRowMenu}>Profile2</MenuItem>
                    <MenuItem onClick={handleCloseRowMenu}>My account</MenuItem>
                    <MenuItem onClick={handleCloseRowMenu}>Logout</MenuItem>
                  </Menu>
                </Td>
              </tr>
            </tbody>
          </Table>

        </Container>
      </Sidebar>
    </>
  );
}

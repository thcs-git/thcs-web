import React, {useState, useEffect, useRef, useCallback, ChangeEvent} from 'react';
import {useHistory, Link} from 'react-router-dom';

import debounce from 'lodash.debounce';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../../../store/';
import {loadRequest, searchRequest, cleanAction} from '../../../store/ducks/companies/actions';
import {CompanyInterface, IProfession} from '../../../store/ducks/companies/types';

import {Container, Menu, MenuItem, TableRow, TableCell} from '@material-ui/core';
import {SearchOutlined, MoreVert} from '@material-ui/icons';

import PaginationComponent from '../../../components/Pagination';
import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import Table from '../../../components/Table';

import {FormTitle} from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

import {formatDate} from '../../../helpers/date';

import {ListItemStatus} from './styles';
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

export interface FlowMeterInterface {
  _id?: string;
  mac?: string;
  date?: string;
}

export default function FlowMeterList() {
  const history = useHistory();

  useEffect(() => {

  }, []);

  const flowMeterState = [
    {_id: '123456798', mac: 'sadasd:dasdas:adasD:ASd', date: '20/10/2021'}
  ]

  return (
    <>
      <Sidebar>
        <Container>
          <FormTitle>Lista de Dispositivos</FormTitle>

            <Table
              tableCells={[
                {name: 'Fluxômetro', align: 'left',},
                {name: 'MAC', align: 'left'},
                {name: 'Cadastrado Em', align: 'left'},
              ]}
            >
              {flowMeterState.map((device: FlowMeterInterface, index: number) => (
                <TableRow key={`device_${index}`}>
                  <TableCell align="left">
                    <Link key={index} to={`/flowmeter/${device._id}`}>{device._id}</Link>
                  </TableCell>
                  <TableCell>
                    <Link key={index} to={`/flowmeter/${device._id}`}>{device.mac}</Link>
                  </TableCell>
                  <TableCell>
                    <Link key={index} to={`/flowmeter/${device._id}`}>{device.date}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
        </Container>
      </Sidebar>
    </>
  );
}

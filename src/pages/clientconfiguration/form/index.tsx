import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {BoxCustom} from './style';

import {Grid} from '@material-ui/core';

import Sidebar from '../../../components/Sidebar';
import InfoCard from "../../../components/Configuration/Info";
import ClientCard from "../../../components/Configuration/ClientCard";
import PermissionCard from "../../../components/Configuration/Permission";

import {ApplicationState} from '../../../store';

import {loadCustomerById} from "../../../store/ducks/customers/actions";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

export default function ClientConfiguration() {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerState = useSelector((state: ApplicationState) => state.customers);

  useEffect(() => {
    const customer = localStorage.getItem(LOCALSTORAGE.CUSTOMER)

    if (customer) {
      dispatch(loadCustomerById(customer))
    }
  }, []);

  return (
    <>
      <Sidebar>
        <BoxCustom>
          <Grid container direction="column">
            <ClientCard customers={customerState.data}/>
            <PermissionCard/>
            <InfoCard name={'TASCOM informática'} version={'0.0.11'} year={'2021'}/>
          </Grid>
        </BoxCustom>
      </Sidebar>
    </>
  );
}

import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

import {ApplicationState} from '../../store';
import {loadUserById} from '../../store/ducks/users/actions';

import LOCALSTORAGE from '../../helpers/constants/localStorage';
import SESSIONSTORAGE from '../../helpers/constants/sessionStorage';
import {handleCompanySelected} from '../../helpers/localStorage';
import {CompanyUserLinkInterface} from "../../store/ducks/users/types";
import _ from 'lodash';
import {loadRequest} from "../../store/ducks/layout/actions";

export default function Configuration() {
  const dispatch = useDispatch();

  const userState = useSelector((state: ApplicationState) => state.users);

  const [user, setUser] = useState({
    id: localStorage.getItem(LOCALSTORAGE.USER_ID) || ``,
    name: localStorage.getItem(LOCALSTORAGE.USERNAME),
    companySelected: handleCompanySelected()
  });
  const [companies, setCompanies] = useState<any>([]);

  useEffect(() => {
    dispatch(loadUserById(user.id, 'sidebar'))
  }, []);

  useEffect(() => {
    const {companies_links: userCompanies} = userState.data

    userCompanies.forEach(function (item: CompanyUserLinkInterface) {
      if (typeof item.companie_id === 'object') {
        Object.assign(item, {customer: item.companie_id?.customer_id?.name + ' - ' + item.companie_id?.name});
      }
    })

    const filter = _.filter(userCompanies,{active: true});
    //console.log(filter);

    setCompanies(_.filter(filter,{companie_id: {active : true}}));
  }, [userState]);

  const selectCompany = useCallback(() => {
    const selected = companies.filter((item: any) => item.companie_id._id === user.companySelected);
    return (selected[0]) ? selected[0] : null;
  }, [companies, user]);

  const changeCompany = useCallback((company: any) => {
    if (company) {
      localStorage.setItem(LOCALSTORAGE.COMPANY_SELECTED, company.companie_id._id);
      localStorage.setItem(LOCALSTORAGE.COMPANY_NAME, company.companie_id.name);
      localStorage.setItem(LOCALSTORAGE.CUSTOMER, company.companie_id.customer_id._id);
      localStorage.setItem(LOCALSTORAGE.CUSTOMER_NAME, company.companie_id.customer_id.name);

      if (company.companie_id.customer_id.integration) {
        sessionStorage.setItem(SESSIONSTORAGE.INTEGRATION, company.companie_id.customer_id.integration);
      } else {
        sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION);
      }

      setUser(prevState => ({
        ...prevState,
        companySelected: company.companie_id._id
      }))
      dispatch(loadRequest())
    }
  }, [user]);

  return (
    <>
      <div>
        <h2>Olá, {user.name}</h2>

        <br/>

        <p>Você está trabalhando nesta empresa, mas você pode mudar quando quiser</p>

        <br/>
        <Grid container>
          <Grid item sm={4} md={12} lg={10}>
            <Autocomplete
              id="combo-box-change-company"
              options={companies}
              getOptionLabel={(option: any) => option.customer}
              getOptionSelected={(option, value) => {
                return (option.companie_id._id === user.companySelected)
                }}
              value={selectCompany()}
              renderInput={(params) => <TextField {...params} label="Empresa" variant="outlined" autoComplete="off"/>}
              size="small"
              onChange={(event, value) => changeCompany(value)}
              noOptionsText="Nenhuma empresa encontrada"
              autoComplete={false}
            />
          </Grid>
        </Grid>

      </div>
    </>
  );
}

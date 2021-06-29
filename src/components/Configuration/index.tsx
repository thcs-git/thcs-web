import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { ApplicationState } from '../../store';
import { loadUserById } from '../../store/ducks/users/actions';

import LOCALSTORAGE from '../../helpers/constants/localStorage';
import { handleCompanySelected } from '../../helpers/localStorage';

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
    dispatch(loadUserById(user.id))
  }, []);

  useEffect(() => {
    const { companies: userCompanies } = userState.data
    setCompanies(userCompanies);
  }, [userState]);

  const selectCompany = useCallback(() => {
    const selected = companies.filter((item: any) => item._id === user.companySelected);
    return (selected[0]) ? selected[0] : null;
  }, [companies, user]);

  const changeCompany = useCallback((company: any) => {
    // if (company != null) {
    //
    // }
    localStorage.setItem(LOCALSTORAGE.COMPANY_SELECTED, company._id);
    localStorage.setItem(LOCALSTORAGE.COMPANY_NAME, company.name);
    localStorage.setItem(LOCALSTORAGE.CUSTOMER, company.customer_id._id);
    localStorage.setItem(LOCALSTORAGE.CUSTOMER_NAME, company.customer_id.name);

    setUser(prevState => ({
      ...prevState,
      companySelected: company._id
    }))
  }, [user]);

  return (
    <>
      <div>
        <h2>Olá, {user.name}</h2>

        <br />

        <p>Você está trabalhando nesta empresa, mas você pode mudar quando quiser</p>

        <br />

        <Grid container>
          <Grid item sm={10} md={10} lg={10}>
            <Autocomplete
              id="combo-box-change-company"
              options={companies}
              getOptionLabel={(option: any) => option.name + "   -   " + option.customer_id.name}
              getOptionSelected={(option, value) => option._id === user.companySelected}
              value={selectCompany()}
              renderInput={(params) => <TextField {...params} label="Empresa" variant="outlined" autoComplete="off" />}
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

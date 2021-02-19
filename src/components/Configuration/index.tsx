import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
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

  const changeCompany = useCallback((id: string) => {
    localStorage.setItem(LOCALSTORAGE.COMPANY_SELECTED, id);

    setUser(prevState => ({
      ...prevState,
      companySelected: id
    }))
  }, [user]);

  return (
    <>
      <div>
        <h2>Olá, {user.name}</h2>

        <br />

        <p>Você está trabalhando nesta empresa, mas você pode mudar quando quiser</p>

        <br />

        <Autocomplete
          id="combo-box-health-plan"
          options={companies}
          getOptionLabel={(option: any) => option.name}
          getOptionSelected={(option, value) => option._id === user.companySelected}
          value={selectCompany()}
          renderInput={(params) => <TextField {...params} label="Empresa" variant="outlined" />}
          size="small"
          onChange={(event, value) => changeCompany(value._id)}
          noOptionsText="Nenhuma empresa encontrada"
          fullWidth
        />
      </div>
    </>
  );
}

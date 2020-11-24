import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import GuestRoute from './guest';
import PrivateRoute from './private';

import Dashboard from '../pages/dashboard';

import CompanyList from '../pages/company/list';
import CompanyForm from '../pages/company/form';

import CustomerList from '../pages/customer/list';
import CustomerForm from '../pages/customer/form';

import EspecialtyList from '../pages/especialty/list';
import EspecialtyForm from '../pages/especialty/form';

import CouncilList from '../pages/council/list';
import CouncilForm from '../pages/council/form';

import AreaList from '../pages/area/list';
import AreaForm from '../pages/area/form';

import UserList from '../pages/user/list';
import UserForm from '../pages/user/form';

import PatientList from '../pages/patient/list';
// import PatientForm from '../pages/patient/form';

import Login from '../pages/login';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <GuestRoute path="/login" component={Login} />

      <PrivateRoute path="/" component={Dashboard} exact />

      {/* Clientes */}
      <PrivateRoute path="/customer" component={CustomerList} exact />
      <PrivateRoute path="/customer/:id/edit" component={CustomerForm} />
      <PrivateRoute path="/customer/create" component={CustomerForm} />

      {/* Empresas */}
      <PrivateRoute path="/company" component={CompanyList} exact />
      <PrivateRoute path="/company/:id/edit" component={CompanyForm} />
      <PrivateRoute path="/company/create" component={CompanyForm} />

      {/* Especialidades */}
      <PrivateRoute path="/specialty" component={EspecialtyList} exact />
      <PrivateRoute path="/specialty/:id/edit" component={EspecialtyForm} />
      <PrivateRoute path="/specialty/create" component={EspecialtyForm} />

      {/* Conselhos */}
      <PrivateRoute path="/council" component={CouncilList} exact />
      <PrivateRoute path="/council/:id/edit" component={CouncilForm} />
      <PrivateRoute path="/council/create" component={CouncilForm} />

      {/* Areas */}
      <PrivateRoute path="/area" component={AreaList} exact />
      <PrivateRoute path="/area/:id/edit" component={AreaForm} />
      <PrivateRoute path="/area/create" component={AreaForm} />

      {/* Usuário */}
      <PrivateRoute path="/user" component={UserList} exact />
      <PrivateRoute path="/user/:id/edit" component={UserForm} />
      <PrivateRoute path="/user/create" component={UserForm} />

      {/* Patient */}
      <PrivateRoute path="/patient" component={PatientList} exact />
      {/* <Route path="/patient/:id/edit" component={PatientForm} />
      <Route path="/patient/create" component={PatientForm} /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;

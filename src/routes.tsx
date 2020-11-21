import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Dashboard from './pages/dashboard';

import CompanyList from './pages/company/list';
import CompanyForm from './pages/company/form';

import CustomerList from './pages/customer/list';
import CustomerForm from './pages/customer/form';

import EspecialtyList from './pages/especialty/list';
import EspecialtyForm from './pages/especialty/form';

import Login from './pages/login';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} exact />

      <Route path="/login" component={Login} />

      <Route path="/dashboard" component={Dashboard} exat />

      {/* Clientes */}
      <Route path="/customer" component={CustomerList} exact />
      <Route path="/customer/:id/edit" component={CustomerForm} />
      <Route path="/customer/create" component={CustomerForm} />

      {/* Empresas */}
      <Route path="/company" component={CompanyList} exact />
      <Route path="/company/:id/edit" component={CompanyForm} />
      <Route path="/company/create" component={CompanyForm} />

      {/* Especialidades */}
      <Route path="/especialty" component={EspecialtyList} exact />
      <Route path="/especialty/:id/edit" component={EspecialtyForm} />
      <Route path="/especialty/create" component={EspecialtyForm} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

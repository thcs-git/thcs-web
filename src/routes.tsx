import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import CompanyList from './pages/company/list';
import CompanyForm from './pages/company/form';

import CustomerList from './pages/customer/list';
import CustomerForm from './pages/customer/form';

import Login from './pages/login';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} exact />

      <Route path="/login" component={Login} />

      {/* Clientes */}
      <Route path="/customer" component={CustomerList} exact />
      <Route path="/customer/:id/edit" component={CustomerForm} />
      <Route path="/customer/create" component={CustomerForm} />

      {/* Empresas */}
      <Route path="/company" component={CompanyList} exact />
      <Route path="/company/:id/edit" component={CompanyForm} />
      <Route path="/company/create" component={CompanyForm} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Dashboard from './pages/dashboard';

import CompanyList from './pages/company/list';
import CompanyForm from './pages/company/form';

import CustomerList from './pages/customer/list';
import CustomerForm from './pages/customer/form';

import EspecialtyList from './pages/especialty/list';
import EspecialtyForm from './pages/especialty/form';

import CouncilList from './pages/council/list';
import CouncilForm from './pages/council/form';

import AreaList from './pages/area/list';
import AreaForm from './pages/area/form';

import UserList from './pages/user/list';
import UserForm from './pages/user/form';

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

      {/* Conselhos */}
      <Route path="/council" component={CouncilList} exact />
      <Route path="/council/:id/edit" component={CouncilForm} />
      <Route path="/council/create" component={CouncilForm} />

      {/* Areas */}
      <Route path="/area" component={AreaList} exact />
      <Route path="/area/:id/edit" component={AreaForm} />
      <Route path="/area/create" component={AreaForm} />

      {/* Usuário */}
      <Route path="/user" component={UserList} exact />
      <Route path="/user/:id/edit" component={UserForm} />
      <Route path="/user/create" component={UserForm} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

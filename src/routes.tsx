import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import CustomerList from './pages/customer/list';
import CustomerForm from './pages/customer/form';
import Login from './pages/login';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} exact />

      <Route path="/login" component={Login} />

      <Route path="/customer" component={CustomerList} exact />
      <Route path="/customer/:id" component={CustomerForm} />
      <Route path="/customer/create" component={CustomerForm} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

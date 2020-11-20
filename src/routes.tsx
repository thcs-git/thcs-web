import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from './pages/login';
// import PatientForm from './pages/patient/form';
import PatientList from './pages/patient/list';

import CustomerList from './pages/customer/list';
import CustomerForm from './pages/customer/form';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} exact />

      <Route path="/login" component={Login} />

      <Route path="/customer" component={CustomerList} exact />
      <Route path="/customer/:id/edit" component={CustomerForm} />
      <Route path="/customer/create" component={CustomerForm} />

      <Route path="/patient" component={PatientList} exact />
      {/* <Route path="/customer/:id/edit" component={CustomerForm} />
      <Route path="/customer/create" component={CustomerForm} /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;

import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import GuestRoute from './guest';
import PrivateRoute from './private';

import Dashboard from '../pages/dashboard';

import CareList from '../pages/care/list';
import CareForm from '../pages/care/form';

import CompanyList from '../pages/company/list';
import CompanyForm from '../pages/company/form';

import CustomerList from '../pages/customer/list';
import CustomerForm from '../pages/customer/form';

import SpecialtyList from '../pages/specialty/list';
import SpecialtyForm from '../pages/specialty/form';

import CouncilList from '../pages/council/list';
import CouncilForm from '../pages/council/form';

import AreaList from '../pages/area/list';
import AreaForm from '../pages/area/form';

import UserList from '../pages/user/list';
import UserForm from '../pages/user/form';

import PatientList from '../pages/patient/list';
import PatientForm from '../pages/patient/form';
import PatientOverview from '../pages/patient/overview';
import PatientCapture from '../pages/patient/capture/list';
import PatientCaptureCreate from '../pages/patient/capture/form';
import PatientCaptureOverview from '../pages/patient/capture/overview';
import PatientCaptureNead from '../pages/patient/capture/nead';

import ProfessionForm from '../pages/profession/form/index';

import Login from '../pages/login';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <GuestRoute path="/login" component={Login} />

      <PrivateRoute path="/" component={Dashboard} exact />
      <PrivateRoute path="/dashboard" component={Dashboard} />

      {/* Clientes */}
      <PrivateRoute path="/customer" component={CustomerList} exact />
      <PrivateRoute path="/customer/:id/edit" component={CustomerForm} />
      <PrivateRoute path="/customer/create" component={CustomerForm} />

      {/* Empresas */}
      <PrivateRoute path="/company" component={CompanyList} exact />
      <PrivateRoute path="/company/:id/edit" component={CompanyForm} />
      <PrivateRoute path="/company/create" component={CompanyForm} />

      {/* Especialidades */}
      <PrivateRoute path="/specialty" component={SpecialtyList} exact />
      <PrivateRoute path="/specialty/:id/edit" component={SpecialtyForm} />
      <PrivateRoute path="/specialty/create" component={SpecialtyForm} />

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
      <PrivateRoute path="/patient/:id/edit" component={PatientForm} />
      <PrivateRoute path="/patient/create" component={PatientForm} />
      <PrivateRoute path="/patient/:id/overview" component={PatientOverview} />
      <PrivateRoute path="/patient/capture" component={PatientCapture} exact />
      <PrivateRoute path="/patient/capture/create" component={PatientCaptureCreate} />
      <PrivateRoute path="/patient/capture/:id/overview" component={PatientCaptureOverview} />
      <PrivateRoute path="/patient/capture/:id/nead" component={PatientCaptureNead} />

      {/* Care */}
      <PrivateRoute path="/care" component={CareList} exact />
      <PrivateRoute path="/care/:id/edit" component={CareForm} />
      <PrivateRoute path="/care/create" component={CareForm} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

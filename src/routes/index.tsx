import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NotFound from '../pages/errors/not-found';
import Login from '../pages/login';
import Surprise from '../pages/surprise';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Surprise} exact />
      <Route path="/:mode" component={Surprise} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

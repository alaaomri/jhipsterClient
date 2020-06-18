import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WebSite from './webSite';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path="/web" component={WebSite}/>
    </Switch>
  </>
);

export default Routes;

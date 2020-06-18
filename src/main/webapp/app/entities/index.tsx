import React from 'react';
import { Switch } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import WebSite from './website';

/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute exact path="/web" component={WebSite}/>
      <ErrorBoundaryRoute path="/website" component={WebSite}/>

    </Switch>
  </div>
);

export default Routes;

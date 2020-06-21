import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WebSite from './webSite';
import WebSiteDetails from 'app/entities/website/webSite-details';
import WebSiteDeleteDialog from 'app/entities/website/webSite-delete-dialog';
import WebSiteCreateOrUpdate from 'app/entities/website/webSite-update';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WebSiteDeleteDialog}/>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WebSiteCreateOrUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WebSiteCreateOrUpdate}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WebSiteDetails}/>
      <ErrorBoundaryRoute path={match.url} component={WebSite}/>
    </Switch>
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Answer from './answer';
import Customer from './customer';
import Question from './question';
import Quiz from './quiz';
import Subject from './subject';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}answer`} component={Answer} />
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}question`} component={Question} />
      <ErrorBoundaryRoute path={`${match.url}quiz`} component={Quiz} />
      <ErrorBoundaryRoute path={`${match.url}subject`} component={Subject} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;

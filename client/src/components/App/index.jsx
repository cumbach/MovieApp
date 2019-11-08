import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Home } from '../../components';
import { MovieDetail } from '../../components';

const App = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movie/:id" component={MovieDetail} />
    </Switch>
  )
}

export default withRouter(App);

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './containers/ChatContainer';
import Login from './containers/LoginContainer';
// import Dashboard from './components/dashboard';
// import RequireAuth from './components/auth/require-auth';

const createRouter = () => (
  <Router>
    <div>
      {/*<Route exact path='/' render={ () => (<Redirect to='/login' />) } />*/}
      <Route exact path='/' component={ Login } />
      <Route exact path='/messages' component={ HomePage } />
     </div>
  </Router>
);

module.exports = createRouter;

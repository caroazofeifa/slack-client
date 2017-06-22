import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Redirect } from 'react-router';

// import App from '../../containers/AppContainer';
// import NotFoundPagse from './components/pages/not-found-page';
import HomePage from '../../containers/ChatContainer';
// import Register from './components/auth/register';
import Login from '../../containers/LoginContainer';
// import Dashboard from './components/dashboard';
// import RequireAuth from './components/auth/require-auth';

const createRouter = () => (
  <Router>
    <div>
      {/*<Route exact path='/' render={ () => (<Redirect to='/login' />) } />*/}
      <Route exact path='/' component={ Login } />
      <Route path='/messages' component={ HomePage } />
      {/*<Route path='/app' component={ App } />*/}
     </div>
  </Router>
);

module.exports = createRouter;

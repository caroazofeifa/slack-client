import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import store from '../../redux/store';
import { SET_USER_DATA } from '../../redux/actions/types';

// import App from '../../containers/AppContainer';
// import NotFoundPagse from './components/pages/not-found-page';
import HomePage from '../../containers/ChatContainer';
// import Register from './components/auth/register';
import Login from '../../containers/LoginContainer';
// import Dashboard from './components/dashboard';
// import RequireAuth from './components/auth/require-auth';
 
const cookies = new Cookies();
 
const token = cookies.get('token');
if (token) {
  store.dispatch({
    type: 'SET_USER_DATA',
    userData: token
  })
}

const createRouter = () => (
  <Router>
    <div>
      <Route exact path='/login' component={ Login } />
      <Route path='/messages' component={ HomePage } />
      {/*<Route path='/app' component={ App } />*/}
     </div>
  </Router>
);

module.exports = createRouter;

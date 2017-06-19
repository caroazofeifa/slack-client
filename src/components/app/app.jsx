import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import createRouter from './routes';

// import { BrowserRouter as Router } from 'react-router-dom';
// import reduxThunk from 'redux-thunk';
// import { AUTH_USER } from './actions/types';

import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './app.scss';

// const reactRouter = require('react-router-dom');
// const Route = reactRouter.Route;
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        { createRouter() }
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app'));

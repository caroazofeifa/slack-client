import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import createRouter from './routes';

import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './app.scss';

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

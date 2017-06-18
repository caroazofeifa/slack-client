import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './app.scss';

const reactRouter = require('react-router-dom');

const Route = reactRouter.Route;

//const LoginContainer = require('../../containers/LoginContainer');

const ChatContainer = require('../../containers/ChatContainer');

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/' component={ ChatContainer } />
      </Router>
    );
  }
}

render(<App />, document.getElementById('app'));

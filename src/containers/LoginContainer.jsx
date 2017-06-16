import React from 'react';

const Nav = require('../components/navLog/navLog');
const Modal = require('./ModalLoginContainer');

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <div className='container-fluid'>
          <Nav />
        </div>
          <Modal />
      </div>
    );
  }
}

module.exports = LoginContainer;

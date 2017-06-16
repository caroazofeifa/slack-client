import React from 'react';

const ModalLog = require('../components/modalLog/modalLog');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <ModalLog />
    );
  }
}

module.exports = Modal;

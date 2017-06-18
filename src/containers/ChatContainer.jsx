import React from 'react';

const ChatHome = require('../components/home/home');

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className='container-fluid'>
          <ChatHome />
      </div>
    );
  }
}

module.exports = ChatContainer;

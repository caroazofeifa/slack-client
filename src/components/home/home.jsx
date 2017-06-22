import React from 'react';
import './home.scss';

const Aside = require('../asideChat/asideChat');
const NavChat = require('../navChat/navChat');
const MainChat = require('../mainChat/mainChat');
const RightAside = require('../rightAsideChat/rightAsideChat');

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className='row home'>
        <Aside
          startConversation={ this.props.startConversation }
          startConversationChannel={ this.props.startConversationChannel }
          allUsers={ this.props.allUsers }
          userData={ this.props.userData }
          usersConnected={ this.props.usersConnected }
        />
        <NavChat 
          chatInfo={ this.props.chatInfo }
          allUsers={ this.props.allUsers }
          userData={ this.props.userData }
        />
        <MainChat
          chatInfo={ this.props.chatInfo }
          sendMessage={ this.props.sendMessage }
        />
        <RightAside />
      </div>
    );
  }
}

module.exports = Menu;

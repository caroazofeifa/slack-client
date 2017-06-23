import React from 'react';
import './home.scss';

import AsideChatContainer from '../../containers/AsideChatContainer';
import NavChat from '../navChat/navChat';
import MainChat from '../mainChat/mainChat';
import RightAside from '../rightAsideChat/rightAsideChat';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className='row home'>
        <AsideChatContainer
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

export default Menu;

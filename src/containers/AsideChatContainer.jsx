import React from 'react';
import AsideChat from '../components/asideChat/asideChat';

const nameOfTheChannel = 'general';

class AsideChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelected: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickChannel = this.handleClickChannel.bind(this);
  }
  componentWillMount() {
    this.setState({ userSelected: nameOfTheChannel });//name channel
    this.props.startConversationChannel(nameOfTheChannel);
  }
  handleClick(info, user) {
    this.setState({ userSelected: user });//name user
    this.props.startConversation(info);//id user
  }
  handleClickChannel(channelName) {
    this.setState({ userSelected: channelName });//name channel
    this.props.startConversationChannel(channelName);//id channel
  }
  render() {
    return (
      <AsideChat
        allUsers={ this.props.allUsers }
        userData={ this.props.userData }
        usersConnected={ this.props.usersConnected }
        userSelected={ this.state.userSelected }
        handleClick={ this.handleClick.bind(this) }
        handleClickChannel={ this.handleClickChannel.bind(this) }
      />
    );
  }
}

export default AsideChatContainer;

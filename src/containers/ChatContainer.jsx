import React from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionUsers from '../redux/actions/index';
import store from '../redux/store';
import { SET_USER_DATA } from '../redux/actions/types';
import ChatHome from '../components/home/home';
// const ChatHome = require('../components/home/home');
const API_SOCKET ='http://localhost:3000';
const io = require('socket.io-client');

let socket = null;

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //The current flow of messages
      actual: 'channel',
      //All the users connected, from the socket
      usersConnected: [],
    };
    this.startConversation = this.startConversation.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.startConversationChannel = this.startConversationChannel.bind(this);
    this.updateStateUsers = this.updateStateUsers.bind(this);
  }
  componentWillMount() {
    //Cookies
    const cookies = new Cookies();
    const token = cookies.get('token');
    //State, gets the user logged in the cookie information
    if (token) {
      store.dispatch({
        type: SET_USER_DATA,
        userData: token,
      });
    }
    //Connects the socket
    socket = io.connect(API_SOCKET);
    //Sends register the user in the socket as connected
    socket.emit('register', token._id);
    //Sends adduser to the usernames in the socket
    socket.emit('adduser', token._id);
    //Receives the data to update the chat.
    //Id for who the message is sent, content of the message, time, id of the user who sends the message, the id of the new message
    socket.on('updatechat', (idMessageFor, data, time, idMessageFrom, username, idMessage) => {
      if (this.props.chatInfo !== undefined) {
        if (this.state.actual === 'channel' && this.props.chatInfo.channel !== undefined) {
        } else if (this.state.actual === 'chat' && this.props.chatInfo.chat !== undefined) {
          (this.props.chatInfo.chat.user1 === idMessageFrom || this.props.chatInfo.chat.user2 === idMessageFrom)
          ? this.props.updateChatForIncommingMessage(idMessageFor, data, time, idMessageFrom, username, idMessage)
          : null;
        }
      }
    });
    //Receives an update of the channel
    //Id for who the message is sent, content of the message, time, id of the user who sends the message, the id of the new message
    socket.on('updatechannel', (idMessageFor, data, time, idMessageFrom, username, idMessage) => {
      if (this.props.chatInfo !== undefined) {
        if (this.state.actual === 'channel' && this.props.chatInfo.channel !== undefined) {
          this.props.updateChannelForIncommingMessage(idMessageFor, data, time, idMessageFrom, username, idMessage);
        }
      }
    });
    //Receives update users
    socket.on('updateusers', (usernames) => {
      this.updateStateUsers(usernames);
    });

    //Gets all the users in the store
    this.props.getUsers();
  }
  /** When the user close the window it closes **/
  componentWillUnMount() {
    const myId = this.props.userData.userData._id;
    socket.emit('disconnect', myId);
  }
  /** Updates the state of users connecteds **/
  updateStateUsers(usernames) {
    this.setState({ usersConnected: usernames });
  }
  /** Start a conversation with the user with the id **/
  startConversation(id) {
    this.setState({ actual: 'chat' });
    this.props.getChats(id, this.props.userData.userData._id);
  }
  /** Start a conversation in the only chat that already exists **/
  startConversationChannel(channelName) { //nameChannel
    this.setState({ actual: 'channel' });
    this.props.getChannels(channelName);
  }
  /** Send the message, receives the content of the message**/
  sendMessage(messageI) {
    const date = new Date();
    const hour = date.getHours() - (date.getHours() >= 12 ? 12 : 0);
    const period = date.getHours() >= 12 ? 'pm' : 'am';
    const finalTime = `${hour}:${date.getMinutes()}${period}`;
    //If the user is chatting in a personal chat
    if (this.props.chatInfo !== undefined) {
      if (this.state.actual === 'chat') {
        if (this.props.chatInfo.chat !== undefined) {
          const chatUpdate = { _id: this.props.chatInfo.chat._id, user1: this.props.chatInfo.chat.user1, user2: this.props.chatInfo.chat.user2, messages: this.props.chatInfo.chat.messages };
          this.props.updateChat(this.props.userData.userData.firstName, messageI, finalTime, chatUpdate, socket);
        } //If the user is chatting in the channel general
      } else if (this.state.actual === 'channel') {
        if (this.props.chatInfo.channel !== undefined) {
          //Const of the channel updated
          const channelUpdate = { _id: this.props.chatInfo.channel._id, name: this.props.chatInfo.channel.name, messages: this.props.chatInfo.channel.messages };
          console.log('Update channel');
          this.props.updateChannel(this.props.userData.userData.firstName, messageI, finalTime, channelUpdate, socket);
        }
      }
    }
  }
  render() {
    return (
      <div className='container-fluid'>
          <ChatHome
            startConversation={ this.startConversation }
            startConversationChannel={ this.startConversationChannel }
            chatInfo={ this.props.chatInfo }
            sendMessage={ this.sendMessage }
            allUsers={ this.props.allUsers }
            userData={ this.props.userData }
            usersConnected={ this.state.usersConnected }
          />
      </div>
    );
  }
}

/**
 * Each time it updates the store mapStateToProps is called
 *
 * allUsers: All the users in the api
 * userData: Info of the loggedUser
 * chatInfo: Info of the: chat, messages, channel
 */
const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
    userData: state.userData,
    chatInfo: state.chatInfo,
  };
};
/**
 * Pass the actionUsers down
 */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionUsers, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);


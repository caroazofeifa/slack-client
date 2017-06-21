import React from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionUsers from '../redux/actions/index';
import store from '../redux/store';
import { SET_USER_DATA, UPDATE_MESSAGE } from '../redux/actions/types';

const ChatHome = require('../components/home/home');

const io = require('socket.io-client');

let socket = null;

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.startConversation = this.startConversation.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateChatIncommingMessage = this.updateChatIncommingMessage.bind(this);
  }
  componentWillMount() {
    //Cookies
    const cookies = new Cookies();
    const token = cookies.get('token');
    //State
    if (token) {
      store.dispatch({
        type: SET_USER_DATA,
        userData: token,
      });
    }
    //Socket
    socket = io.connect('http://localhost:3000');
    //Se registra con su id y su socket id en el register
    // console.log('token: ',token._id);
    // console.log('EMIT register: ',this.props.userData.userData._id);
    socket.emit('register',token._id);

    socket.on('updatechat', (username, data, time, id) => {
      // console.log('esta updeiteando chat');
      this.updateChatIncommingMessage(username, data, time, id);
    });
    this.props.getUsers();
  }
  startConversation(id) {
    // console.log('Start conversation:' + id + ' & ' +this.props.userData.userData._id)
    socket.emit('adduser', id);
    this.props.getChats(id, this.props.userData.userData._id);
  }
  sendMessage(messageI){
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1; //January is 0!

    const yyyy = today.getFullYear();
    const h = today.getHours();
    const m = today.getMinutes();
    const finalTime = `${dd}/${mm}/${yyyy} ${h}:${m}`;
 
    // console.log(this.props.chatInfo.chat);
    const chatUpdate = {'_id': this.props.chatInfo.chat._id, 'user1':this.props.chatInfo.chat.user1, 'user2':this.props.chatInfo.chat.user2, 'messages':this.props.chatInfo.chat.messages }
    this.props.updateChat(this.props.userData.userData.firstName, messageI, finalTime, chatUpdate, socket);
    // this.updateChatIncommingMessage(this.props.userData.userData.firstName, messageI, finalTime, this.props.userData.userData._id);


  }
  updateChatIncommingMessage(username, data, time, id){
    // console.log('new message!');
    // console.log('Mensaje: ', username, data, time, id);
    this.props.updateChatForIncommingMessage(username, data, time, id);
  }
  render() {
    return (
      <div className='container-fluid'>
          <ChatHome
            startConversation={ this.startConversation }
            chatInfo={ this.props.chatInfo }
            sendMessage={ this.sendMessage }
            allUsers={ this.props.allUsers }
            userData={ this.props.userData }
          />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
    userData: state.userData,
    chatInfo: state.chatInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionUsers, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);


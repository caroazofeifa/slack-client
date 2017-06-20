import React from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionUsers from '../redux/actions/index';
import store from '../redux/store';
import { SET_USER_DATA } from '../redux/actions/types';

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
    socket.on('updatechat', (username, data, time) => {
      console.log('esta updeiteando chat');
      this.updateChatIncommingMessage(username, data, time);
    });
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
    const s = today.getMinutes();
    const finalTime = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
    // console.log(this.props.userData.userData._id);
    // console.log(messageI);
    // console.log(finalTime);
    // console.log(this.props.chatInfo.chat);
    const chatUpdate = {'_id': this.props.chatInfo.chat._id, 'user1':this.props.chatInfo.chat.user1, 'user2':this.props.chatInfo.chat.user2, 'messages':this.props.chatInfo.chat.messages }
    this.props.updateChat(this.props.userData.userData._id, messageI, finalTime, chatUpdate);
    socket.emit('sendchat', messageI, finalTime,);
  }
  updateChatIncommingMessage(username, data, time){
    console.log('new message!');
    console.log('Mensaje: ', username, data, time);
    this.props.updateChatForIncommingMessage(username, data, time);
  }
  render() {
    // socket.on('updatechat', function (username, data, time) {	
    //   console.log('Mensaje: ', username, data, time);
    //   if(this.props != undefined){
      //   console.log('1');
      //   if (this.props.chatInfo !== undefined &&  this.props.chatInfo !== null){
      //     console.log('2');
      //     const chatid = this.props.chatInfo.chat._id;
      //     this.props.updateChat(username, data, time, chatid);
      //   }
      // }
	  // });
    return (
      <div className='container-fluid'>
          <ChatHome
            value={ this.props.allUsers }
            getUsers={ this.props.getUsers }
            startConversation={ this.startConversation }
            chatInfo={ this.props.chatInfo }
            sendMessage={ this.sendMessage }
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


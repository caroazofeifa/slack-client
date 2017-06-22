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
      actual:'channel',
    };
    this.startConversation = this.startConversation.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateChatIncommingMessage = this.updateChatIncommingMessage.bind(this);
    this.startConversationChannel = this.startConversationChannel.bind(this);
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
    socket.emit('register',token._id);
    
    //io.to(connections[idMessageFor]).emit('updatechat', idMessageFor, data, time,idMessageFrom, socket.username);      
    socket.on('updatechat', (idMessageFor, data, time, idMessageFrom,username,idMessage) => {
        console.log('idMessageFor',idMessageFor);//THIS IS WHAT I NEED--
        console.log('data',data);//THIS IS WHAT I NEED
        console.log('time',time);//THIS IS WHAT I NEED
        console.log('idMessageFrom', idMessageFrom);//THIS IS WHAT I NEED
        console.log('username', username);//THIS IS WHAT I NEED
        console.log('idMessage', idMessage);//THIS IS WHAT I NEED
       if(this.props.chatInfo!=undefined) {
        console.log('CHAT INFO');
        if(this.state.actual==='channel' &&this.props.chatInfo.channel!=undefined){
          console.log('CHANNEL');
          //(this.props.chatInfo.chat.user1==idMessageFrom || this.props.chatInfo.chat.user2==idMessageFrom) ?
          // this.props.updateChannelForIncommingMessage(idMessageFor, data, time, idMessageFrom,username,idMessage);
          ///: null
        }
        else if(this.state.actual==='chat' &&this.props.chatInfo.chat!=undefined){
          console.log('CHAT');
          (this.props.chatInfo.chat.user1==idMessageFrom || this.props.chatInfo.chat.user2==idMessageFrom) ?
          this.props.updateChatForIncommingMessage(idMessageFor, data, time, idMessageFrom,username,idMessage)
          : null
        }
      }
    });
      socket.on('updatechannel', (idMessageFor, data, time, idMessageFrom,username,idMessage) => {
        console.log('idMessageFor',idMessageFor);//THIS IS WHAT I NEED--
        console.log('data',data);//THIS IS WHAT I NEED
        console.log('time',time);//THIS IS WHAT I NEED
        console.log('idMessageFrom', idMessageFrom);//THIS IS WHAT I NEED
        console.log('username', username);//THIS IS WHAT I NEED
        console.log('idMessage', idMessage);//THIS IS WHAT I NEED
       if(this.props.chatInfo!=undefined) {
        console.log('CHAT INFO');
        if(this.state.actual==='channel' &&this.props.chatInfo.channel!=undefined){
          console.log('CHANNEL');
          //(this.props.chatInfo.chat.user1==idMessageFrom || this.props.chatInfo.chat.user2==idMessageFrom) ?
          this.props.updateChannelForIncommingMessage(idMessageFor, data, time, idMessageFrom,username,idMessage);
          ///: null
        }
        else if(this.state.actual==='chat' &&this.props.chatInfo.chat!=undefined){
          console.log('CHAT');
          // (this.props.chatInfo.chat.user1==idMessageFrom || this.props.chatInfo.chat.user2==idMessageFrom) ?
          // this.props.updateChatForIncommingMessage(idMessageFor, data, time, idMessageFrom,username,idMessage)
          // : null
        }
      }
    });
    this.props.getUsers();
    
  }
  startConversation(id) {
    this.setState({actual:'chat'});
    socket.emit('adduser', id);
    this.props.getChats(id, this.props.userData.userData._id);
  }
  startConversationChannel(channelName){//nameChannel
    this.setState({actual:'channel'});
    this.props.getChannels(channelName);
  }
  sendMessage(messageI){
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1; //January is 0!

    const yyyy = today.getFullYear();
    const h = today.getHours();
    const m = today.getMinutes();
    //const finalTime = `${dd}/${mm}/${yyyy} ${h}:${m}`;
    const finalTime = `${h}:${m}`;
  
    if(this.props.chatInfo!= undefined){
  
      if(this.state.actual=='chat'){
        if(this.props.chatInfo.chat!=undefined){
  
          const chatUpdate = {'_id': this.props.chatInfo.chat._id, 'user1':this.props.chatInfo.chat.user1, 'user2':this.props.chatInfo.chat.user2, 'messages':this.props.chatInfo.chat.messages }
          this.props.updateChat(this.props.userData.userData.firstName, messageI, finalTime, chatUpdate, socket);
          // this.updateChatIncommingMessage(this.props.userData.userData.firstName, messageI, finalTime, this.props.userData.userData._id);
        } 
      } else{
        if (this.state.actual=='channel'){
            if(this.props.chatInfo.channel!=undefined){
              const channelUpdate = {'_id': this.props.chatInfo.channel._id, 'name':this.props.chatInfo.channel.name, 'messages':this.props.chatInfo.channel.messages }
              this.props.updateChannel(this.props.userData.userData.firstName, messageI, finalTime, channelUpdate, socket);
          }
        }       
      }
    }
  }

  
  updateChatIncommingMessage(idMessageFor, data, time, idMessageFrom,username,idMessage){
  
  }
  updateChannelIncommingMessage(idMessageFor, data, time, idMessageFrom,username,idMessage){
  
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


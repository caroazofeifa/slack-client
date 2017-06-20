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
  }
  startConversation(id) {
    // console.log('Start conversation:' + id + ' & ' +this.props.userData.userData._id)
    socket.emit('adduser', id);
    this.props.getChats(id, this.props.userData.userData._id);
  }
  render() {
    return (
      <div className='container-fluid'>
          <ChatHome
            value={ this.props.allUsers }
            getUsers={ this.props.getUsers }
            startConversation= {this.startConversation }
            chatInfo={ this.props.chatInfo }
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
    // messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionUsers, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);


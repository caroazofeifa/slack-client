import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

const io = require('socket.io-client');

let socket = null;


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      otheruser: '',
      data: ['holi'],
      usernames: {'ja':'ja'},
      message: '',
    };
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.sendName = this.sendName.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentWillMount() {
    socket = io.connect('http://localhost:3000');
    // socket.on('connect', () => {
    //   // call the server-side function 'adduser' and send one parameter (value of prompt)
    // });
  }
  handleChangeMessage(event) {
    const messageI = event.currentTarget.value;
    this.setState({ message: messageI });
  }
  handleChangeName(event) {
    const nameI = event.currentTarget.value;
    this.setState({ username: nameI });
  }
  sendMessage() {
    console.log('send name');
    socket.emit('sendchat', this.state.message);
  }
  sendName() {
    console.log('send chat');
    socket.emit('adduser', this.state.username);
  }
  render() {
    socket.on('updateusers', (usernamesI) => {
      this.setState({ usernames: usernamesI });
    });
    return (
      <div>
        <div className='col-md-12 '>
          <h1> Your name </h1>
          <input id='name' type='text' placeholder='Name' onChange={ this.handleChangeName } />
          <button onClick={ this.sendName } >Save </button>
          <p>----------------</p>
          <p>chatting: </p>
          <h1> {this.state.otheruser } </h1>
          <p>{ this.state.data }</p>
          <textarea onChange={ this.handleChangeMessage } />
          <button onClick={ this.sendMessage } >Send </button>
        </div>
      </div>
    );
  }
}

module.exports = AppContainer;

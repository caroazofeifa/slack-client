import React from 'react';
import ReactDOM from 'react-dom';
import './mainChat.scss';

const preload = '../../src/images/';

const Messages = require('../dateMessagesChat/dateMessageChat');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  componentDidMount() {
     this.scrollToBottom();
  }
  componentDidUpdate() {
      this.scrollToBottom();
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      const message = event.currentTarget.value;
      this.props.sendMessage(message);
      event.currentTarget.value ='';
    }
  }
  scrollToBottom() {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };
  render() {
    return (
      <div className='col-md-7 col-xs-8 col-sm-8'>
        <main className='main__position'>
          <div className='row'>
            <div 
              ref={(el) => { this.messagesContainer = el; }}
              className='col-md-12 main main__center mainChat scrollbar' id='style-1'>
              <Messages
                chatInfo={ this.props.chatInfo }
              />
            </div>
          </div>
        </main>
        <footer>
          <div className='row'>
            <div className='col-md-12 footer__center'>
              <div className='messageEntry'>
                <button className='buttonPlus' href='#' id='' >
                  <img className='imgPlus' src={ `${preload}plus.svg` } />
                </button>
                <input name='inputMessage' ref='form' className='inputMessage' onKeyDown={ this.handleKeyPress } type='text' placeholder='Message' />
                <button className='buttonSmile' href='#' id='' >
                  <img className='imgSmile' src={ `${preload}smile.svg` } />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

module.exports = Chat;

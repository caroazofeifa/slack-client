import React from 'react';
import ReactDOM from 'react-dom';
import './mainChat.scss';
import Messages from '../dateMessagesChat/dateMessageChat';

const preload = '../../src/images/';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  /**
   * Scrolls to the bottom to the bottom of the page in the chat
   * When creates the component
   */
  componentDidMount() {
    this.scrollToBottom();
  }
  /**
   * Scrolls to the bottom to the bottom of the page in the chat
   * When creates updates
   */
  componentDidUpdate() {
    this.scrollToBottom();
  }
  /**
   * Press enter to send the message
   */
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      const message = event.currentTarget.value;
      this.props.sendMessage(message);
      event.currentTarget.value = '';
    }
  }
  /**
   * Method to send the messages to the bottom, deprecated change
   */
  scrollToBottom() {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  render() {
    return (
      <div className='col-md-7 col-xs-8 col-sm-8'>
        <main className='main__position'>
          <div className='row'>
            <div
              ref={ (el) => { this.messagesContainer = el; } }
              className='col-md-12 main main__center mainChat scrollbar' id='style-1'
            >
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
                  <img className='imgPlus' src={require(`../../images/plus.svg`) } />
                </button>
                <input name='inputMessage' ref='form' className='inputMessage' onKeyDown={ this.handleKeyPress } type='text' placeholder='Message' />
                <button className='buttonSmile' href='#' id='' >
                  <img className='imgSmile' src={require(`../../images/smile.svg`) } />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Chat;

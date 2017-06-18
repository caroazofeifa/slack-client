import React from 'react';
import './mainChat.scss';

const preload = '../../src/images/';

const Messages = require('../dateMessagesChat/dateMessageChat');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className='col-md-7 '>
        <main className='main__position'>
          <div className='row'>
            <div className='col-md-12 main main__center mainChat'>
              <Messages />
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
                <input className='inputMessage' type='text' placeholder='Message' />
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

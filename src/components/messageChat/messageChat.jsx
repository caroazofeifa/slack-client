import React from 'react';
import './messageChat.scss';

const preload = '../../src/images/';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <div className='row message'>
          <div className='col-md-2'>
            <img className='imgMessage' src={ `${preload}boy3.png` } />
          </div>
          <div className='col-md-10'>
            <div className='messageTitle'>
              <h4 className='name__style'> {this.props.message.owner}</h4>
              <h5 className='time__style'> {this.props.message.time}</h5>
            </div>
            <p className='p__style'>
              {this.props.message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Message;

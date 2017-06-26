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
          <div className='col-lg-2 col-md-2 col-sm-3 col-xs-6'>
            <img className='imgMessage' src={require(`../../images/${this.props.message.owner}.png`) } />
          </div>
          <div className='col-lg-10 col-md-10 col-sm-9 col-xs-6'>
            <div className='messageTitle'>
              <h4 className='name__style'> {this.props.message.owner}</h4>
              <h5 className='time__style'>
                {this.props.message.time}
              </h5>
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

export default Message;

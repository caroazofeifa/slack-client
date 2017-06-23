import React from 'react';
import './dateMessageChat.scss';
import Message from '../messageChat/messageChat';

class DateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className='row'>
        <div className='col-md-2 col-md-offset-5'>
          <h2 className='dateMessage'>
            Today
          </h2>
        </div>
        <div className='col-md-12'>
          { this.props.chatInfo !== undefined && this.props.chatInfo !== null ?
            this.props.chatInfo.messages !== undefined ?
              this.props.chatInfo.messages
              .map((message) => (
                <Message
                  key={ message._id }
                  message={ message }
                />
              ))
              :
              null
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default DateMessage;

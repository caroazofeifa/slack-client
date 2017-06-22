import React from 'react';
import './channelAsideChat';

let stateOfChat = 'notselected';
const nameOfTheChannel ='general';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     

    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.props.onClick(nameOfTheChannel,nameOfTheChannel);
  }
  render() {
    if (this.props.selected) {
      stateOfChat= 'selected';
    } else {
      stateOfChat='notselected';
    }   
    return (
      <a><span onClick={ this.handleClick } className={`channel ${stateOfChat}`} >{nameOfTheChannel}</span> </a>             
    );
  }
}

export default Channel;
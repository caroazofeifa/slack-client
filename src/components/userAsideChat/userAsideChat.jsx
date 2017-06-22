import React from 'react';
import './userAsideChat.scss';

const preload = '../src/images/';
let stateOfChat = 'notselected';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     

    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.props.onClick(this.props.user._id,this.props.user.profile.firstName);
  }
  render() {
    if (this.props.selected) {
      stateOfChat= 'selected';
    } else {
      stateOfChat='notselected';
    }   
    return (
      <a key={ this.props.user._id } onClick={ this.handleClick }><span></span>
      <span
          className={`user-status ${stateOfChat} offline`} 
          id={ this.props.user._id } >
          { this.props.user.profile.firstName }
          </span>
      </a>               
    );
  }
}

export default User;
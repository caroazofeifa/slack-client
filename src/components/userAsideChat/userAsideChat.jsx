import React from 'react';
import './userAsideChat.scss';

const preload = '../src/images/';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    //TO DO: DESCONECTESE DEL SOCKET!!!
    this.props.handleClick(event.target.id);
  }
  render() {
    return (
      <a key={ this.props.id } onClick={ this.handleClick }><span></span>
      <span
          className={`user-status ${this.props.stateOfChat} ${this.props.stateOfUser}`} 
          id={ user._id } >
          { this.props.firstName }
          </span>
      </a>               
    );
  }
}

module.exports = Aside;

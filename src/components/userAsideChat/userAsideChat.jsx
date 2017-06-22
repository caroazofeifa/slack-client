import React from 'react';
import './userAsideChat.scss';

const preload = '../src/images/';
let stateOfChat = 'notselected';
let stateOfUser = 'offline' 
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
  //  .online_selected::before{
  //   background: white;
  // }
  // .online_notselected::before{
  //   background: $brand-green;
  // }
  render() {
    let element=undefined;
    if(this.props.usersConnected!==undefined){
      let index = this.props.usersConnected.findIndex((element) => (element === this.props.user._id));
      element= this.props.usersConnected[index];
      console.log('USERS CONNECTED:' ,element,'==?',this.props.user._id);
    }  
    if (this.props.selected) {
      stateOfChat= 'selected';
      if (element!==undefined) {
        stateOfUser='online_selected';
      }else {
        stateOfUser='offline'; 
      }
    } else {
      stateOfChat='notselected';
      if (element!==undefined) {
        stateOfUser='online_notselected';
      }else {
        stateOfUser='offline'; 
      }
    }   
    return (
      <a key={ this.props.user._id } onClick={ this.handleClick }><span></span>
      <span
          className={`user-status ${stateOfChat} ${stateOfUser}`} 
          id={ this.props.user._id } >
          { this.props.user.profile.firstName }
          </span>
      </a>               
    );
  }
}

export default User;
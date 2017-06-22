import React from 'react';
import './asideChat.scss';
import User from '../userAsideChat/userAsideChat';
import Channel from '../channelAsideChat/channelAsideChat';

const preload = '../src/images/';

// const User = require('../userAsideChat/userAsideChat');
// const Channel = require('../channelAsideChat/channelAsideChat');
class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelected: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(info,user) {
    console.log('INFO',info, 'USER',user);
    this.setState({userSelected:user})//name user
    this.props.startConversation(info);//id user
  }
  // image(){
  //   const myId = this.props.userData.userData._id;
  //   const user1 = this.props.chatInfo.chat.user1;
  //   const user2 = this.props.chatInfo.chat.user2;
  //   const userImage =
  //   this.props.allUsers.allUsers
  //   .map((user) => (
  //     if(user._id ==){

  //     }   
      
  //   ))
  // }

  render() {
    
    return (
      <div className='aside col-md-2'>
      <div className='row'>
        <header className='col-md-12 header'>
          <div className='header-content aside-margin-left'>
             <span className='white-text'>Konrad Group</span>
             <span className='user-status online_notselected'>{ `${this.props.userData.userData.firstName} ${this.props.userData.userData.lastName}` }</span>
          </div>
        </header>
        <div className='col-md-12 body'>
          <div className='body-wrapper aside-margin-left scrollbar2' id='style-2'>
            <div className='channels-info'>
              <a><span className='channels-options'>ALL UNREADS</span></a>
              <a><span className='channels-options'>ALL THREADS</span></a>
              <a><span className='channels-options'>CHANNELS</span></a>
              <div className='channels'>
                <Channel
                    //key={ user._id }
                    //user= {user}    
                    onClick={ this.handleClick.bind(this) }
                    selected={ this.state.userSelected=='general' ? true : false }
                  />
              </div>
            </div>
            <div className='direct-messages'>
              <span className='channels-options'>DIRECT MESSAGES</span>
              { (this.props.allUsers.allUsers.length > 1 ?
                this.props.allUsers.allUsers
                .map((user) => (
                  <User
                    key={ user._id }
                    user= {user}    
                    onClick={ this.handleClick.bind(this) }
                    selected={ this.state.userSelected==user.profile.firstName ? true : false }
                  />
                  ))
              : <div />) }
            </div>
          </div>
        </div>
        <footer className='col-md-12 footer '>
          <div className='aside-margin-left'>
            <span className='white-text'>
              <img src={ `${preload}searchAside.svg` } className='search-icon' alt='Search' /> Search
            </span>
          </div>
        </footer>
      </div>
    </div>
    );
  }
}

module.exports = Aside;

import React from 'react';
import './asideChat.scss';

const preload = '../src/images/';

const User = require('../userAsideChat/userAsideChat');

class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelected: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(info,user) {
    this.setState({userSelected:user})
    this.props.startConversation(info);
  }
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
                <a><span className='channel'>Channel 1</span> </a>
                <a><span className='channel'>Channel 1</span> </a>
                <a><span className='channel'>Channel 1</span> </a>
                <a><span className='channel'>Channel 1</span> </a>
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

import React from 'react';
import './asideChat.scss';
import User from '../userAsideChat/userAsideChat';
import Channel from '../channelAsideChat/channelAsideChat';

const preload = '../src/images/';
const nameOfTheChannel = 'general';

class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickChannel = this.handleClickChannel.bind(this);
  }
  handleClick(info, user) {
    this.props.handleClick(info, user);//id user
  }
  handleClickChannel(channelName) {
    this.props.handleClickChannel(channelName);//id channel
  }
  render() {
    return (
      <div className='aside col-md-2 col-xs-4 col-sm-4'>
      <div className='row'>
        <header className='col-md-12 header'>
          <div className='header-content aside-margin-left'>
            <div className='team'>
              <span className='white-text'>Konrad Group
                <img className='imgArrow__header' src={require(`../../images/learnDown.png`) } />
              </span>
             </div>
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
                  onClick={ this.handleClickChannel.bind(this) }
                  selected={ this.props.userSelected === nameOfTheChannel }
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
                    user={ user }
                    onClick={ this.handleClick.bind(this) }
                    selected={ this.props.userSelected === user.profile.firstName }
                    usersConnected={ this.props.usersConnected }
                  />
                  ))
              : <div />) }
            </div>
          </div>
        </div>
        <footer className='col-md-12 footer '>
          <div className='aside-margin-left'>
            <span className='white-text'>
              <img src={require(`../../images/searchAside.svg`) } className='search-icon' alt='Search' /> Search
            </span>
          </div>
        </footer>
      </div>
    </div>
    );
  }
}

export default Aside;

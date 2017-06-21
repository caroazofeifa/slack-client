import React from 'react';
// import store from '../../redux/store';
import './asideChat.scss';

const preload = '../src/images/';


class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offline: 'offline',
      online_selected: 'online_selected',
      online_notselected: 'online_notselected',

      stateOfUser: '',
///////////////////////////////////
      selected: 'selected',
      notselected:'notselected',
      
      stateOfChat: 'notselected',

    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    //TO DO: DESCONECTESE DEL SOCKET!!!
    console.log()
    this.props.startConversation(event.target.id);
    this.setState({stateOfUser:this.state.selected});
    this.setState({stateOfChat:this.state.notselected});
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
                  <a key={ user._id } onClick={ this.handleClick }><span></span>
                    <span
                      className={`user-status ${this.state.selected} ${this.state.online}`} 
                      id={ user._id } >
                        { user.profile.firstName }
                      </span>
                    </a>
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

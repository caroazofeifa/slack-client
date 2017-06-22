import React from 'react';
import './navChat.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className='navBarContainer'>
        <div className='col-md-10'>
          <div className='navBarChat'>
              <div className='navBarLeft'>
                  <div className='title'>
                    <h3 className='titleNavBarLeft'>
                      {(this.props.chatInfo!=undefined && this.props.userData !=undefined && this.props.allUsers!=undefined)
                        ? (this.props.chatInfo.chat!= undefined)
                          ? (this.props.chatInfo.chat.user1 == this.props.userData._id)
                            ? this.props.allUsers.allUsers.find( (element) => ( element._id === this.props.chatInfo.chat.user2 )).profile.firstName 
                            : this.props.allUsers.allUsers.find( (element) => ( element._id === this.props.chatInfo.chat.user1 )).profile.firstName 
                          : (this.props.chatInfo.channel!= undefined) 
                            ? this.props.chatInfo.channel.name
                            :''
                        : ''
                      }
                    </h3>
                  </div>
                  <div className='images'>
                    <img src='./src/components/navChat/star.svg' className='imageNavBarLeft starImage' />
                    <img src='./src/components/navChat/user.svg' className='imageNavBarLeft userImage' />
                    <img src='./src/components/navChat/pin.svg' className='imageNavBarLeft pinImage' />
                    <img src='./src/components/navChat/add.svg' className='imageNavBarLeft addImage' />
                    <p className='textNavBarLeft'>Add a topic</p>
                  </div>
              </div>
              <div className='navBarRight'>
                  <div className='searchInputContainer'>
                    <input type='text' className='searchInputNavBar' name='srch-term' placeholder='Search' />
                    <img src='./src/components/navChat/search.svg' className='searchInputImage' />
                  </div>
                  <img src='./src/components/navChat/phone.svg' className='imageNavBarRight callImage' />
                  <img src='./src/components/navChat/configurations.svg' className='imageNavBarRight settingsImage' />
                  <img src='./src/components/navChat/fileSettings.svg' className='imageNavBarRight filesImage' />
              </div>
          </div>
      </div>
    </div>
    );
  }
}

module.exports = Nav;

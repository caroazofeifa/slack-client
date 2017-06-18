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
                      <h3 className='titleNavBarLeft'>Channel#2</h3>
                  </div>
                  <div className='images'>
                      <img src={require(`./star.svg`)} className='imageNavBarLeft starImage' />
                      <img src={require(`./user.svg`)} className='imageNavBarLeft userImage' />
                      <img src={require(`./pin.svg`)} className='imageNavBarLeft pinImage' />
                      <img src={require(`./add.svg`)} className='imageNavBarLeft addImage' />
                      <p className='textNavBarLeft'>Add a topic</p>
                  </div>
              </div>
              <div className='navBarRight'>
                  <div className='searchInputContainer'>
                      <input type='text' className='searchInputNavBar' name='srch-term' placeholder='Search'/>
                      <img src={require(`./search.svg`)} className='searchInputImage'/>
                      {/*<span className='searchInputSpan'>Search</span>*/}
                  </div>
                  <img src={require(`./phone.svg`)} className='imageNavBarRight callImage' />
                  <img src={require(`./configurations.svg`)} className='imageNavBarRight settingsImage' />
                  <img src={require(`./fileSettings.svg`)} className='imageNavBarRight filesImage' />
              </div>
          </div>
      </div>
    </div>
    );
  }
}

module.exports = Nav;

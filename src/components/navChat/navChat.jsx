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
      <div className='col-md-10'>
        <header className='row header__position'>
          <div className='col-md-12'>
            <div className='col-md-8 header header__center'>
              h2
            </div>
            <div className='col-md-4 header header__right'>
              h3
            </div>
          </div>
        </header>
      </div>
    );
  }
}

module.exports = Nav;

import React from 'react';
import './navLog.scss';

const preload = '../../src/images/';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className='row'>
        <div className='header'>
          <div className='col-md-12'>
            <nav className='sideNav'>
              <ul>
                <li>
                  <a className='imagLog' ><img className='' src={ `${preload}navbarlogo.svg` } /></a>
                </li>
                <li className='float--right' >
                  <a className='li--box' >Your teams </a>
                </li>
                <li className='float--right' >
                  <a className='' >Support </a>
                </li>
                <li className='float--right' >
                  <a className='' >Pricing </a>
                </li>
                <li className='float--right' >
                  <a className='' >Product </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className='image-background row imag-background'>
          <div className='col-md-12'>.
          </div>
        </div>
        <div className='background row'>
          <div className='col-md-12'>.
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Nav;

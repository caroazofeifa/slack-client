import React from 'react';
import './modalLog.scss';

const preload = '../src/images/';

class ModalLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <div className='modalLogin' >
          <div className='row' >
            <div className='col-md-4 col-md-offset-4' >
              <img className='imageLogo' src={require(`../images/slacklogo.svg`) } />
            </div>
            <div className='col-md-8 col-md-offset-2 center' >
              <h3 className='title'>Sign in</h3>
            </div>
            <div className='col-md-8 col-md-offset-2 center'>
              <input className='inputEmail' type='text' placeholder='juanpablo@gmail.com' />
            </div>
            <div className='col-md-8 col-md-offset-2 center'>
              <input className='inputText' type='text' placeholder='*******' />
              <button className='buttonArrow' href='#' id='' >
                <img className='imgArrow' src={require(`../images/loginarrow.svg`) } />
              </button>
            </div>
            <div className='col-md-8 col-md-offset-2 center'>
              <p className='p__login--center'>You do not have an account?</p>
              <p className='p__login--left'>Sign up </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ModalLog;

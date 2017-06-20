import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../redux/actions/index';

import '../components/modalLog/modalLog.scss';

const preload = '../src/images/';

const Nav = require('../components/navLog/navLog');
// const Modal = require('./ModalLoginContainer');

const form = reduxForm({
  form: 'login',
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleFormSubmit(formProps) {
    // console.log('calling loginUser');
    this.props.loginUser(formProps);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Nav />
        <div className='modalLogin' >
          <div className='row' >
            <div className='col-md-4 col-md-offset-4' >
              <img className='imageLogo' src={ `${preload}slacklogo.svg` } />
            </div>
            <div className='col-md-8 col-md-offset-2 center' >
              <h3 className='title'>Sign in</h3>
            </div>
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
              { this.renderAlert() }
              <div className='col-md-8 col-md-offset-2 center'>
                <Field name='email' className='inputEmail' component='input' type='text' placeholder='juanpablo@gmail.com' />
              </div>
              <div className='col-md-8 col-md-offset-2 center'>
                <Field name='password' className='inputText' component='input' type='password' placeholder='*******' />
                {/*<Link to='/messages'>*/}
                  <button className='buttonArrow' href='#' id='' type='submit' >
                    <img className='imgArrow' src={ `${preload}loginarrow.svg` } />
                  </button>
                {/*</Link>  */}
              </div>
           </form>
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

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));

import React from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionUsers from '../redux/actions/index';
import store from '../redux/store';
import { SET_USER_DATA } from '../redux/actions/types';

const ChatHome = require('../components/home/home');

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    const cookies = new Cookies();
    const token = cookies.get('token');
    if (token) {
      store.dispatch({
        type: SET_USER_DATA,
        userData: token,
      });
    }
  }
  render() {
    return (
      <div className='container-fluid'>
          <ChatHome
            value={ this.props.allUsers }
            getUsers={ this.props.getUsers }
          />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionUsers, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);


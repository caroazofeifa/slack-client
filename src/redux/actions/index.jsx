import axios from 'axios';
import Cookies from 'universal-cookie';  
// import { AUTH_USER } from './types';
import { SET_USER_DATA } from './types';

import store from '../store';

const API_URL = 'http://localhost:3000/api';

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }
}
export function setUserData(userData) {
    console.log('SET', userData);
}

export function loginUser({ email, password }) {
  return (dispatch) => {
    console.log('inside loginuser');
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(response => {
      store.dispatch({
        type: 'SET_USER_DATA',
        userData: response.data.user
      })
      const cookies = new Cookies();
      cookies.set('token', response.data.user, { path: '/' });
      //cookie.save('token', response.data.user, { path: '/' });
      //dispatch({ type: SET_USER_DATA, userData: response.data.user });
      window.location.href = '/messages';      
      //setUserData(response.data.user);
    })
    .catch((error) => {
      //errorHandler(dispatch, error.response, 'auth_error');
      console.log('Error');
    });
  };
}
export function getUserData({ id }) {
  return (dispatch) => {
    console.log('GET',id);
  };
}


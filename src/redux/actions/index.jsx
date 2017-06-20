import axios from 'axios';
import Cookies from 'universal-cookie';
import { SET_USER_DATA } from './types';

const API_URL = 'http://localhost:3000/api';

export function setUserData(userData) {
  console.log('SET', userData);
}

export function loginUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(response => {
      // store.dispatch({
      dispatch({
        type: SET_USER_DATA,
        userData: response.data.user,
      });
      const cookies = new Cookies();
      cookies.set('token', response.data.user, { path: '/' });
      window.location.href = '/messages';
    })
    .catch((error) => {
      console.log('Error loginUser: ', error);
    });
  };
}
export function getUsers() {
  return (dispatch) => {
    axios.get(`${API_URL}/users`)
    .then(response => {
      dispatch({
        type: 'SET_ALL_USERS',
        allUsers: response.data,
      });
    })
    .catch((error) => {
      console.log('Error getUsers: ', error);
    });
  };
}
// export function getUserData({ id }) {
//   return (dispatch) => {
//     // console.log('GET', id);
//   };
// }


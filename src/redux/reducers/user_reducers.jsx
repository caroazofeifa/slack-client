import { GET_USER_DATA, SET_USER_DATA } from '../actions/types';

// const INITIAL_STATE = {_id: '', firstName: '', lastName:'', email:''};

const DEFAULT_STATE = {
  userData: { _id: '', firstName: '', lastName: '', email: '' },
};

const userReducer = (state, action) => {
  return Object.assign({}, state, { userData: action.userData });
};


export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return state;
    case SET_USER_DATA:
      return userReducer(state, action);
    default:
      return state;
  }
}

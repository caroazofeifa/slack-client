import { GET_ALL_USERS, SET_ALL_USERS } from '../actions/types';

const DEFAULT_STATE = {
  allUsers: [{}],
};

const usersReducer = (state, action) => {
  //console.log('HOLIIII',action.allUsers)
  return Object.assign({}, state, { allUsers: action.allUsers });
};


export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return state;
    case SET_ALL_USERS:
      return usersReducer(state, action);
    default:
      return state;
  }
}

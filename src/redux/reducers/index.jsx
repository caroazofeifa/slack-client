import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducers';
import userReducer from './user_reducers';
import allUsersReducer from './allUsers_reducers';
import chatUserReducer from './chat_reducers';


const rootReducer = combineReducers({
  auth: authReducer,
  userData: userReducer,
  allUsers: allUsersReducer,
  chatInfo: chatUserReducer,
  form: formReducer,
});

export default rootReducer;

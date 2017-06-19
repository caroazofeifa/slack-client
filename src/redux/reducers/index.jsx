import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducers';
import userReducer from './user_reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  userData: userReducer,
  form: formReducer,
});

export default rootReducer;

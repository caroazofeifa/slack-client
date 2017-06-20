import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f,
);
const store = createStoreWithMiddleware(rootReducer, enhancers);

export default store;

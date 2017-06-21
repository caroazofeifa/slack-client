import { GET_CHAT, SET_CHAT, GET_MESSAGE, SET_MESSAGE, UPDATE_MESSAGE } from '../actions/types';

const DEFAULT_STATE = {
  chat: [],
  messages: [],
};

const chatReducer = (state, action) => {
  return Object.assign({}, state, { chat: action.chat });
};
const messageReducer = (state, action) => {
  return Object.assign({}, state, { messages: action.messages });
};
const updateMessageReducer = (state, action) => {
  // console.log('STATE', state);
  // console.log('ACT.MESS', action.messages);
  const newMessages = state.messages;
  newMessages.push(action.messages);
  return Object.assign({}, state, { messages: newMessages });
};


export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_CHAT:
      return state.chat;
    case SET_CHAT:
      return chatReducer(state, action);
    case GET_MESSAGE:
      return state.messages;
    case SET_MESSAGE:
      return messageReducer(state, action);
    case UPDATE_MESSAGE:
      return updateMessageReducer(state, action);
    default:
      return null;
  }
}

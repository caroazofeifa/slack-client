import { GET_CHAT, SET_CHAT, GET_MESSAGE, SET_MESSAGE } from '../actions/types';

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
    default:
      return null;
  }
}

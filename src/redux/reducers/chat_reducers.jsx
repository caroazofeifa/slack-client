import { GET_CHAT, SET_CHAT, GET_MESSAGE, SET_MESSAGE, UPDATE_MESSAGE, GET_CHANNEL, SET_CHANNEL } from '../actions/types';

const DEFAULT_STATE = {
  chat: [],
  messages: [],
  channel: [],
};
//SET_CHAT
const chatReducer = (state, action) => {
  return Object.assign({}, state, { chat: action.chat });
};
//SET_MESSAGE
const messageReducer = (state, action) => {
  return Object.assign({}, state, { messages: action.messages });
};
//UPDATE_MESSAGE
const updateMessageReducer = (state, action) => {
  const newMessages = state.messages;
  newMessages.push(action.messages);
  return Object.assign({}, state, { messages: newMessages });
};
//SET_CHANNEL
const channelReducer = (state, action) => {
  return Object.assign({}, state, { channel: action.channel });
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_CHAT:
      return state.chat;
    case SET_CHAT:
      return chatReducer(state, action);
    case GET_CHANNEL:
      return state.chat;
    case SET_CHANNEL:
      return channelReducer(state, action);
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

import axios from 'axios';
import Cookies from 'universal-cookie';
import { SET_USER_DATA, SET_CHAT, SET_MESSAGE, UPDATE_MESSAGE, SET_CHANNEL } from './types';
import store from '../../redux/store';

const API_URL = 'http://localhost:3000/api';

export function loginUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(response => {
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
//get all the usera from the DB
export function getUsers() {
  // console.log('GETTING USERS');
  return (dispatch) => {
    axios.get(`${API_URL}/users`)
    .then(response => {
      // console.log('RESPONSE',response.data);
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
//get all the messages of a conversation
export function getMessages() {
  return (dispatch) => {
    axios.get(`${API_URL}/messages`)
    .then(response => {
      dispatch({
        type: SET_MESSAGE,
        messages: response.data,
      });
    })
    .catch((error) => {
      console.log('Error getMessages: ', error);
    });
  };
}

export function compareMessagesChannel() {
  if (store.getState().chatInfo.channel !== undefined) {
    const messagesInChannel = store.getState().chatInfo.channel.messages;
    const messagesInDB = store.getState().chatInfo.messages;
    const messagesFinal = [];
    if (messagesInChannel !== undefined) {
      messagesInDB
      .map((show) =>
        messagesInChannel
        .map((show2) =>
          (show._id === show2)
          ? messagesFinal.push(show)
          : null,
      ));
    }
    store.dispatch({
      type: SET_MESSAGE,
      messages: messagesFinal,
    });
  } else {
    console.log('else');
    store.dispatch({
      type: SET_MESSAGE,
      messages: [],
    });
  }
}
export function compareMessages() {
  if (store.getState().chatInfo.chat !== undefined) {
    const messagesInChat = store.getState().chatInfo.chat.messages;
    const messagesInDB = store.getState().chatInfo.messages;
    const messagesFinal = [];
    if (messagesInChat !== undefined) {
      messagesInDB
      .map((show) =>
        messagesInChat
        .map((show2) =>
          (show._id === show2)
          ? messagesFinal.push(show)
          : null,
      ));
    }
    store.dispatch({
      type: SET_MESSAGE,
      messages: messagesFinal,
    });
  } else {
    store.dispatch({
      type: SET_MESSAGE,
      messages: [],
    });
  }
}
export function createChannel(nameChannel) {
  const chat = { name: nameChannel, messages: [] };
  axios.post(`${API_URL}/channels`, chat)
  .then(response => {
    store.dispatch({
      type: SET_CHANNEL,
      chat: response.data,
    });
    compareMessagesChannel();
  })
  .catch((error) => {
    console.log('Error createChat: ', error);
  });
}
export function createChat(user1, user2) {
  const chat = { user1, user2, messages: [] };
  axios.post(`${API_URL}/chats`, chat)
  .then(response => {
    // console.log(response.data);
    store.dispatch({
      type: SET_CHAT,
      chat: response.data,
    });
    compareMessages();
  })
  .catch((error) => {
    console.log('Error createChat: ', error);
  });
}

export function getChats(idOther, idMine) {
  return (dispatch) => {
    Promise.all([
      axios.get(`${API_URL}/chats`)
      .then(response => {
        let countEqualChats = 0;

        response.data
        .map((show) =>
          ((show.user1 === idOther && show.user2 === idMine) || (show.user2 === idOther && show.user1 === idMine))
          ?
            dispatch({
              type: SET_CHAT,
              chat: show,
            }, countEqualChats++,
            )
          : null,
        );
        if (countEqualChats === 0) {
          createChat(idOther, idMine);
        }
      }),
      axios.get(`${API_URL}/messages`)
      .then(response => {
        dispatch({
          type: SET_MESSAGE,
          messages: response.data,
        });
      }),
    ]).then(() => {
      compareMessages();
    })
    .catch((error) => {
      console.log('Error getChats: ', error);
    });
  };
}
export function getChannels(nameChannel) {
  return (dispatch) => {
    Promise.all([
      axios.get(`${API_URL}/channels`)
      .then(response => {
        let countEqualChats = 0;
        response.data
        .map((show) =>
          (show.name === nameChannel)
          ?
            dispatch({
              type: SET_CHANNEL,
              channel: show,
            }, countEqualChats++,
            )
          : null,
        );
        if (countEqualChats === 0) {
          createChannel(nameChannel);
        }
      }),
      axios.get(`${API_URL}/messages`)
      .then(response => {
        dispatch({
          type: SET_MESSAGE,
          messages: response.data,
        });
      }),
    ]).then(() => {
      compareMessagesChannel();
    })
    .catch((error) => {
      console.log('Error getChannels: ', error);
    });
  };
}

export function updateChat(username, data, time, newChat, socket) {
  return (dispatch) => {
    const message = { owner: username, content: data, time };
    Promise.all([
      axios.post(`${API_URL}/messages`, message)
      .then(response => {
        let idMessageFor = 'something';
        if (store.getState().userData.userData._id === newChat.user1) {
          idMessageFor = newChat.user2;
        } else {
          idMessageFor = newChat.user1;
        }
        const idMessageFrom = store.getState().userData.userData._id;
        const idMessage = response.data._id;

        socket.emit('sendchat', idMessageFor, data, time, idMessageFrom, username, idMessage);

        newChat.messages.push(response.data._id);
        const message = { _id: response.data._id, owner: response.data.owner, content: response.data.content, time: response.data.time };
        dispatch({
          type: UPDATE_MESSAGE,
          messages: message,
        });
        axios.put(`${API_URL}/chats/${newChat._id}`, newChat)
        .then(response => {
          // console.log('Vamo a hacer dispatch: :)',response);
        });
      }),
    ]).then(() => {
      // console.log('after promise')
    })
    .catch((error) => {
      console.log('Error updateChat: ', error);
    });
  };
}

export function updateChannel(username, data, time, newChannel, socket) {
  return (dispatch) => {
    const messagePost = { owner: username, content: data, time };
    Promise.all([
      axios.post(`${API_URL}/messages`, messagePost)
      .then(response => {
        const idMessageFor = 'general';

        const idMessageFrom = 'general';
        const idMessage = response.data._id;

        socket.emit('sendchannel', idMessageFor, data, time, idMessageFrom, username, idMessage);
        newChannel.messages.push(response.data._id);
        const message = { _id: response.data._id, owner: response.data.owner, content: response.data.content, time: response.data.time };
        dispatch({
          type: UPDATE_MESSAGE,
          messages: message,
        });
        axios.put(`${API_URL}/channels/${newChannel._id}`, newChannel)
        .then(response => {
          // console.log('Vamo a hacer dispatch: :)',response);
        });
      }),
    ]).then(() => {
      // console.log('after promise')
    })
    .catch((error) => {
      console.log('Error updateChannel: ', error);
    });
  };
}

export function updateChatForIncommingMessage(idMessageFor, data, time, idMessageFrom, username, idMessage) {
  return (dispatch) => {
    const message = { _id: idMessage, owner: username, content: data, time };
    dispatch({
      type: UPDATE_MESSAGE,
      messages: message,
    });
  };
}
export function updateChannelForIncommingMessage(idMessageFor, data, time, idMessageFrom, username, idMessage) {
  return (dispatch) => {
    const message = { _id: idMessage, owner: username, content: data, time };
    dispatch({
      type: UPDATE_MESSAGE,
      messages: message,
    });
  };
}


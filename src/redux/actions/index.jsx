import axios from 'axios';
import Cookies from 'universal-cookie';
import { SET_USER_DATA, SET_CHAT, SET_MESSAGE, UPDATE_MESSAGE } from './types';
import store from '../../redux/store';

const API_URL = 'http://localhost:3000/api';

export function setUserData(userData) {
  console.log('SET', userData);
}
//Logs de user
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

//get all the usera from the DB
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
//get all the messages of a conversation
export function getMessages() {
  // const c =store.getState().chatInfo.chat.messages;
  // console.log('GET MESSAGES CHAT-->',c);
  return (dispatch) => {
    axios.get(`${API_URL}/messages`)
    .then(response => {
      // console.log('GET MESSAGES DB-->', response.data);
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
export function compareMessages() {
  const messagesInChat = store.getState().chatInfo.chat.messages;
  // console.log('CHAT-->',messagesInChat);
  const messagesInDB = store.getState().chatInfo.messages;
  // console.log('MESSAGES-->',messagesInDB);

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
  // console.log('MESSAGES FINAL-->',messagesFinal);
  store.dispatch({
    type: SET_MESSAGE,
    messages: messagesFinal,
  });
}
//get all the chats of a conversation
export function getChats(idOther, idMine) {
  // console.log('GET CHATS',idOther, idMine);
  return (dispatch) => {
    Promise.all([
      axios.get(`${API_URL}/chats`)
      .then(response => {
        //dispatch({type: 'SET_CHAT',chat: {},})
        response.data
        .map((show) =>
          ((show.user1 === idOther && show.user2 === idMine) || (show.user2 === idOther && show.user1 === idMine))
          ? dispatch({
            type: SET_CHAT,
            chat: show,
          })
          : dispatch({ type: SET_CHAT, chat: {} }),
        );
      }),
      axios.get(`${API_URL}/messages`)
      .then(response => {
        // console.log('GET MESSAGES DB-->', response.data);
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

export function updateChat(username, data, time, newChat,socket) { 
  return (dispatch) => {
    const message = { 'owner': username, 'content': data, 'time': time };
    // console.log('Message', message);
    // console.log('Chat', newChat);
    Promise.all([      
      //saves the message, get the id to save in the chat.
      axios.post(`${API_URL}/messages`, message)
      .then(response => {
        console.log('ID DEL NUEVO MENSAJE: ', response.data._id);
        socket.emit('sendchat', data, time,response.data._id);
        newChat.messages.push(response.data._id);        
        axios.put(`${API_URL}/chats/${newChat._id}`,newChat)
        .then(response => {
          console.log('Vamo a hacer dispatch: :)',response);
          // dispatch({
            
          // });
        })
      }),      
    ]).then(() => {
      console.log('after promise')
    })
    .catch((error) => {
      console.log('Error updateChat: ', error);
    });
  };
}

export function updateChatForIncommingMessage(username, data, time, id) {
  return (dispatch) => {
    const message = { '_id': id, 'owner': username, 'content': data, 'time': time };
    console.log('Message', message);
    dispatch({
        type: UPDATE_MESSAGE,
        messages: message,
      });
  };
}


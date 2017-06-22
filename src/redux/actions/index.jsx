import axios from 'axios';
import Cookies from 'universal-cookie';
import { SET_USER_DATA, SET_CHAT, SET_MESSAGE, UPDATE_MESSAGE } from './types';
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
  console.log('GETTING USERS');
  return (dispatch) => {
    axios.get(`${API_URL}/users`)
    .then(response => {
      console.log('RESPONSE',response.data);
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
export function compareMessages() {
  // console.log('inCompareMessages')
  if(store.getState().chatInfo.chat!= undefined){
    const messagesInChat = store.getState().chatInfo.chat.messages;
    // console.log('messagesInChat', messagesInChat);
    const messagesInDB = store.getState().chatInfo.messages;
    // console.log('messagesInDB', messagesInDB);
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
  } else{
    store.dispatch({
      type: SET_MESSAGE,
      messages: [],
    });
  }
}
export function getChats(idOther, idMine) {
  // console.log('GET CHATS',idOther, idMine);
  return (dispatch) => {
    Promise.all([
      axios.get(`${API_URL}/chats`)
      .then(response => {
        let countEqualChats =0;
        // console.log(countEqualChats);                
        //console.log(response.data);
        response.data
        .map((show) =>
          ((show.user1 === idOther && show.user2 === idMine) || (show.user2 === idOther && show.user1 === idMine))
          ? 
            dispatch({
              type: SET_CHAT,
              chat: show,
            },countEqualChats++
            )
          : null
        );  
        if(countEqualChats===0){
          createChat(idOther,idMine);
        }     
      }),
      axios.get(`${API_URL}/messages`)
      .then(response => {
        // console.log('Messages!!:', response.data);
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

export function createChat(user1,user2) { 
  const chat = { 'user1': user1, 'user2': user2, 'messages': [] };
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

export function updateChat(username, data, time, newChat, socket) { 
  console.log('EL NEW CHAT CON EL ID PORFAVOR!!',newChat);
  return (dispatch) => {
    const message = { 'owner': username, 'content': data, 'time': time };
    Promise.all([      
      axios.post(`${API_URL}/messages`, message)
      .then(response => {
        // console.log('ID DEL NUEVO MENSAJE: ', response.data._id);
        // io.to(socket.id).emit("event", data);
        //socket.emit('sendchat', data, time,response.data._id);
        // console.log(store.getState().userData.userData._id);
        // console.log('U1',newChat.user1)
        // console.log('U2',newChat.user2);
        // console.log('response.data._id',response.data._id);
        let idAquienSeLoMando ='something';
        if(store.getState().userData.userData._id===newChat.user1){
          idAquienSeLoMando=newChat.user2;
        } else{
          idAquienSeLoMando=newChat.user1;
        }
        // console.log('USERNAME',username);
        socket.emit('sendchat', idAquienSeLoMando, data, time, username);

        newChat.messages.push(response.data._id);  
        // console.log('AAA!-->',response.data);      
        // if(newChat.user1!==newChat.user1) {
        // console.log('son iguales');
        const message = { '_id': response.data._id, 'owner': response.data.owner, 'content': response.data.content, 'time': response.data.time };
        dispatch({
          type: UPDATE_MESSAGE,
          messages: message,
        });
        // }

        axios.put(`${API_URL}/chats/${newChat._id}`,newChat)
        .then(response => {
          // console.log('Vamo a hacer dispatch: :)',response);
        })
      }),      
    ]).then(() => {
      // console.log('after promise')
    })
    .catch((error) => {
      console.log('Error updateChat: ', error);
    });
  };
}

export function updateChatForIncommingMessage(username, data, time, id) {
  return (dispatch) => {
    // console.log(username, data, time, id);
    const message = { '_id': id, 'owner': username, 'content': data, 'time': time };
    // console.log('Message', message);
    dispatch({
        type: UPDATE_MESSAGE,
        messages: message,
      });
  };
}


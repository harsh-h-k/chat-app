import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './css/chat.css'

import InfoBar from '../components/InfoBar'
import Messages from '../components/Messages'
import Send from '../components/Send'



let socket;
const ENDPOINT = 'localhost:5000';

function Chat({ location }) {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages , message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);


  const sendMessage = (event) => {
    event.preventDefault()
    
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages)


  return (
    <div className="chat">
    <div className="chat__container">
    <InfoBar room={room} />
    <Messages messages={messages} name={name} />
    <Send message={message} sendMessage={sendMessage} setMessage={setMessage} />
    </div>
    
    </div>
  )
}

export default Chat

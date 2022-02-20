import React, { useState } from "react";

import { io, Socket } from "socket.io-client";

import "./App.css";
import Chat from "./Chat";

const socket: Socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  function joinRoom(event: React.FormEvent) {
    event.preventDefault()

    if(username === '' || room === '') {
      console.log('enter valid data')
      return
    }
    socket.emit("joinRoom", room)
    console.log(username, room);
  }
  return (
    <div className="App">
      <h3>Join a room?</h3>
      <form onSubmit={joinRoom}>
        <input
          type="text"
          placeholder="name"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="room id"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button type="submit">
          Join
        </button>
      </form>
      <Chat socket={socket} username={username} room={room}/>
    </div>
  );
}

export default App;

import React, { useState } from "react";

import { io, Socket } from "socket.io-client";

import "./App.css";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";

const socket: Socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="App">
      <Login socket={socket} username={username} room={room} setUsername={setUsername} setRoom={setRoom}/>
      <Chat socket={socket} username={username} room={room}/>
    </div>
  );
}

export default App;

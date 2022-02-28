import React, { useState } from "react";

import { io, Socket } from "socket.io-client";

import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";

import classes from "./App.module.css";

const socket: Socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [userLogged, setUserLogged] = useState<boolean>(false)

  return (
    <div className={classes.app}>
      {!userLogged ? (
        <Login
          socket={socket}
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
          setUserLogged={setUserLogged}
        />
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;

import React from "react";

import { Socket } from "socket.io-client";

import classes from "./Login.module.css";

interface Props {
  socket: Socket;
  username: string;
  room: string;
  setUsername: (str: string) => void;
  setRoom: (str: string) => void;
  setUserLogged: (bool: boolean) => void;
}

export default function Login({
  socket,
  username,
  room,
  setUsername,
  setRoom,
  setUserLogged,
}: Props) {
  
  function joinRoom(event: React.FormEvent) {
    event.preventDefault();

    if (username === "" || room === "") {
      console.log("enter valid data");
      return;
    }
    socket.emit("joinRoom", room);
    console.log(username, room);
    setUserLogged(true);
  }

  return (
    <div className={classes.loginContainer}>
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
        <button type="submit">Join &#10132;</button>
      </form>
    </div>
  );
}

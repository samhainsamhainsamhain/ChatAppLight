import React from "react";

import { Socket } from "socket.io-client";

interface Props {
    socket: Socket;
    username: string;
    room: string;
    setUsername: (val: string) => void;
    setRoom: (val: string) => void;
  }

export default function Login({socket, username, room, setUsername, setRoom}: Props) {
    
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
    <div>
      {" "}
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
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

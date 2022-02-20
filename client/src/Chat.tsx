import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  username: string;
  room: string;
}

export default function Chat({ socket, username, room }: Props) {
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
      socket.on("receiveMessage", (data) => {
         console.log(data)
      })
  }, [socket])

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();

    if (currentMessage === "") {
      return;
    }

    const messageData = {
      room,
      author: username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("sendMessage", messageData);
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
          />
          <button type="submit">&#9658;</button>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  username: string;
  room: string;
}

type MessageObj = {
  author: string;
  message: string;
  room: string;
  time: string;
};

export default function Chat({ socket, username, room }: Props) {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageObj[]>([]);

  // waiting for new messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((prevState) => [...prevState, data]);
    });
  }, [socket]);

  // sending message to other persons in current room
  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    //prevent sending of blank messages
    if (currentMessage === "") {
      return;
    }
    // forming message object 
    const messageData: MessageObj = {
      room,
      author: username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    // sending new message to backend
    socket.emit("sendMessage", messageData);
    // for user to see his own messages we have to add it to the local list of messages
    setMessageList((prevState) => [...prevState, messageData]);
    setCurrentMessage("");
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            <div key={Math.random()}>
              <h3>{messageContent.author}</h3>
              <p>{messageContent.message}</p>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={currentMessage}
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

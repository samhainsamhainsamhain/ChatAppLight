import React, { useEffect, useState, useRef } from "react";

import { Socket } from "socket.io-client";

import classes from "./Chat.module.css";

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

  const getMessageStyle = (messageContent: MessageObj) => {
    if (messageContent.author === username) {
      return classes.owner;
    }
    return classes.other;
  };
  
  // on receiveng new messages chat window now scrolls to bottom 

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  function scrollToBottom(): void {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messageList]);

  return (
    <div className={classes.chatWindow}>
      <header>
        <h3>Live Chat</h3>
      </header>
      <div className={classes.chatContainer}>
        {messageList.map((messageContent) => {
          return (
            <div
              key={Math.random()}
              className={classes.message}
              id={getMessageStyle(messageContent)}
            >
              <h4 key={Math.random()} className={classes.messageAuthor}>
                {messageContent.author}
              </h4>
              <p key={Math.random()} className={classes.messageBody}>
                {messageContent.message}
              </p>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className={classes.chatFooter}>
        <form className={classes.chatForm}
        onSubmit={sendMessage}>
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

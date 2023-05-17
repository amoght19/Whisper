// Chat.js

import React, { useState, useEffect, useContext } from "react";
import { useSocket } from "./Context/SocketProvider";
import { useUser } from "./Context/UserProvider";
import BackButton from "./components/BackButton";
import Settings from "./components/Settings";
import DimmedOverlay from "./components/DimmedOverlay";
import styles from "./styles/Chat.module.css";
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const { username, setUsername, roomJoined, setRoomJoined, dimmedBackground } =
    useUser();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useSocket();

  const handleChatMessageReceived = ({ msg, username }) => {
    console.log(socket);
    setMessages((prevMessages) => [...prevMessages, { msg, username }]);
  };

  const handleNewUserJoined = ({ username }) => {
    setMessages((prevMessages) => [...prevMessages, { username }]);
  };
  useEffect(() => {
    socket.on("chat message received", handleChatMessageReceived);
    socket.on("new user joined", handleNewUserJoined);

    return () => {
      socket.off("chat message received", handleChatMessageReceived);
      socket.off("new user joined", handleNewUserJoined);
    };
  }, [handleChatMessageReceived, handleNewUserJoined, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { msg: input, username, byYou: true },
      ]);
      socket.emit("chat message send", {
        msg: input,
        roomNumber: roomJoined,
        username: username,
      });
      setInput("");
    }
  };

  return (
    <>
      <div className={styles.page_conatiner}>
        <h1 className={styles.heading}>Room {roomJoined}</h1>
        <div className={styles.chat_container}>
          {messages.map(({ msg, username, byYou }, index) =>
            msg ? (
              <>
                {byYou ? (
                  <div key={index} className={styles.user_message}>
                    {msg}
                  </div>
                ) : (
                  <div key={index} className={styles.message}>
                    {username + " : "} {msg}
                  </div>
                )}
              </>
            ) : (
              <div key={index}>{username + " joined "}</div>
            )
          )}
        </div>
      </div>
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            <SendIcon />
          </button>
        </form>
      </div>
      <Settings />
      <BackButton />
      {dimmedBackground && <DimmedOverlay />}
    </>
  );
};

export default Chat;

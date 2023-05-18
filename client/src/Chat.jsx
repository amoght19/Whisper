// Chat.js

//React imports
import React, { useState, useEffect, useContext, useRef } from "react";

//Context
import { useSocket } from "./Context/SocketProvider";
import { useUser } from "./Context/UserProvider";

//Components
import Settings from "./components/Settings";
import DimmedOverlay from "./components/DimmedOverlay";
import LeaveRoom from "./components/LeaveRoom";

//Styles and Icons
import styles from "./styles/Chat.module.css";
import SendIcon from "@mui/icons-material/Send";

//Sounds
import ReceivingSound from "./assets/receiving.mp3";
import SendingSound from "./assets/sending.mp3";

const Chat = () => {
  const {
    username,
    setUsername,
    roomJoined,
    setRoomJoined,
    dimmedBackground,
    sound,
  } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useSocket();
  const chat_container = useRef(null);
  const receivingSoundRef = useRef(null);
  const sendingSoundRef = useRef(null);

  const scrollBottom = () => {
    const container = chat_container.current;
    if (container) {
      //Setting high value of scroll to react end of container
      container.scrollTop = 10000;
    }
  };

  const handleChatMessageReceived = ({ msg, username }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { msg: username + " : " + msg },
    ]);
    playAudio(receivingSoundRef);
  };

  const handleNewUserJoined = ({ username }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { msg: username + " has joined the chat", left: true },
    ]);
  };

  const handleUserLeft = ({ username }) => {
    console.log(username, " left");
    setMessages((prev) => [
      ...prev,
      { msg: username + " has left the chat", left: true },
    ]);
  };

  //Play sound
  const playAudio = (ref) => {
    if (ref.current && sound) {
      ref.current.play();
    }
  };

  //Useffect for messages
  useEffect(() => {
    scrollBottom();
  }, [messages]);

  //For receving informations
  useEffect(() => {
    socket.on("chat message received", handleChatMessageReceived);
    socket.on("new user joined", handleNewUserJoined);
    socket.on("user left", handleUserLeft);
    return () => {
      socket.off("chat message received", handleChatMessageReceived);
      socket.off("new user joined", handleNewUserJoined);
      socket.off("user left", handleUserLeft);
    };
  }, [handleChatMessageReceived, handleNewUserJoined, handleUserLeft, socket]);

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
      playAudio(sendingSoundRef);
    }
  };

  return (
    <>
      {/* Audio Refs for sound */}
      <audio ref={sendingSoundRef} src={SendingSound} />
      <audio ref={receivingSoundRef} src={ReceivingSound} />
      <div className={styles.page_conatiner}>
        <h1 className={styles.heading}>Room {roomJoined}</h1>
        <div className={styles.chat_container} ref={chat_container}>
          {messages.map(({ msg, username, byYou, left }, index) =>
            byYou ? (
              <p key={index} className={styles.user_message}>
                {msg}
              </p>
            ) : left ? (
              <p key={index} className={styles.join_message}>
                {msg}
              </p>
            ) : (
              <p key={index} className={styles.message}>
                {msg}
              </p>
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
      <LeaveRoom />
      {dimmedBackground && <DimmedOverlay />}
    </>
  );
};

export default Chat;

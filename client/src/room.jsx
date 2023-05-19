//room.jsx

//React imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useSocket } from "./Context/SocketProvider";
import { useUser } from "./Context/UserProvider";

//Styles
import styles from "./styles/room.module.css";

//Components
import BackButton from "./components/BackButton";
import Settings from "./components/Settings";
import DimmedOverlay from "./components/DimmedOverlay";
import Error from "./components/Error";

//Pages
import Sign from "./Sign";

const Room = () => {
  const socket = useSocket();
  const [roomCreate, setRoomCreate] = useState("");
  const { roomJoined, setRoomJoined, username, dimmedBackground } = useUser();
  const [roomWantedToJoin, setRoomWantedJoin] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDivVisible, setIsDivVisible] = useState(false);
  const navigate = useNavigate();
  let timer;

  const handleJoinRomm = (e) => {
    e.preventDefault();
    if (roomWantedToJoin) {
      socket.emit("room join", {
        roomJoined: roomWantedToJoin,
        username,
        password: joinPassword,
      });
      setRoomJoined(roomWantedToJoin);
    } else {
      setErrorMessage("Enter room number");
      setIsDivVisible(true);
    }
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (roomCreate) {
      socket.emit("room create", {
        roomJoined: roomCreate,
        username: username,
        password: createPassword,
      });
    } else {
      setErrorMessage("Enter the room number");
      setIsDivVisible(true);
    }
  };

  const handleRoomTaken = () => {
    setRoomJoined("");
    setErrorMessage("room already taken");
    setIsDivVisible(true);
  };

  const handleRoomAvailable = () => {
    navigate(`/room/${roomCreate}`);
    setRoomJoined(roomCreate);
  };

  const handleWrongPassword = () => {
    setErrorMessage("Wrong Password, please try again");
    setIsDivVisible(true);
  };

  const handleSuccessfulJoin = ({ roomJoined }) => {
    setRoomJoined(roomJoined);
    navigate(`/room/${roomJoined}`);
  };

  //UseEffect for errors
  useEffect(() => {
    if (isDivVisible && errorMessage) {
      clearTimeout(timer);
      console.log("error running");
      timer = setTimeout(() => {
        setIsDivVisible(false);
      }, 800);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage, isDivVisible]);

  //Useffect for all the events accociated with creation and joining of rooms
  useEffect(() => {
    socket.on("room taken", handleRoomTaken);
    socket.on("room available", handleRoomAvailable);
    socket.on("wrong password", handleWrongPassword);
    socket.on("successful join", handleSuccessfulJoin);
    return () => {
      socket.off("room taken", handleRoomTaken);
      socket.off("room available", handleRoomAvailable);
      socket.off("wrong password", handleWrongPassword);
      socket.off("successful join", handleSuccessfulJoin);
    };
  }, [
    handleRoomTaken,
    handleRoomAvailable,
    handleWrongPassword,
    handleSuccessfulJoin,
  ]);

  if (username == "") {
    return <Sign />;
  }
  return (
    <>
      <BackButton />
      <Settings />
      <div className={styles.page_container}>
        <div className={styles.part_container}>
          <h1 className={styles.heading}>Make Room</h1>
          <div className={styles.form_container}>
            <form onSubmit={handleCreateRoom} className={styles.form}>
              <input
                type="text"
                placeholder="Enter room number"
                value={roomCreate}
                onChange={(e) => setRoomCreate(e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Set password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                create
              </button>
            </form>
          </div>
        </div>

        <div className={styles.part_container}>
          <h1 className={styles.heading}>Join Room</h1>
          <div className={styles.form_container}>
            <form onSubmit={handleJoinRomm} className={styles.form}>
              <input
                type="text"
                placeholder="Enter room number"
                value={roomWantedToJoin}
                onChange={(e) => setRoomWantedJoin(e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Password"
                value={joinPassword}
                onChange={(e) => setJoinPassword(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                join
              </button>
            </form>
          </div>
        </div>
      </div>
      {dimmedBackground && <DimmedOverlay />}
      {isDivVisible && <Error message={errorMessage} />}
    </>
  );
};

export default Room;

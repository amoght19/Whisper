//React imports
import React, { useContext, useEffect, useState } from "react";
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

const Room = () => {
  const socket = useSocket();
  const [roomCreate, setRoomCreate] = useState("");
  const { roomJoined, setRoomJoined, username, dimmedBackground } = useUser();
  const [createPassword, setCreatePassword] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const navigate = useNavigate();

  const handleJoinRomm = (e) => {
    e.preventDefault();
    if (roomJoined) {
      socket.emit("room join", {
        roomJoined,
        username,
        password: joinPassword,
      });
    } else {
      alert("Enter the room number");
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
      alert("Enter the room number");
    }
  };

  const handleRoomTaken = () => {
    setRoomJoined("");
    console.log("set the room");
    alert("room already taken");
  };

  const handleRoomAvailable = () => {
    console.log("cfeated=", roomCreate);

    navigate(`/room/${roomCreate}`);
    setRoomJoined(roomCreate);
  };

  const handleWrongPassword = () => {
    alert("Wrong password, try again");
  };

  const handleSuccessfulJoin = ({ roomJoined }) => {
    setRoomJoined(roomJoined);
    navigate(`/room/${roomJoined}`);
  };

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
                value={roomJoined}
                onChange={(e) => setRoomJoined(e.target.value)}
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
    </>
  );
};

export default Room;

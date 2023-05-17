import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./Context/SocketProvider";
import { useUser } from "./Context/UserProvider";
import styles from "./styles/room.module.css";
import BackButton from "./components/BackButton";
import Settings from "./components/Settings";
import DimmedOverlay from "./components/DimmedOverlay";

const Room = () => {
  const socket = useSocket();
  const [roomCreate, setRoomCreate] = useState("");
  const { roomJoined, setRoomJoined, username, dimmedBackground } = useUser();
  const navigate = useNavigate();

  const handleJoinRomm = (e) => {
    e.preventDefault();
    if (roomJoined) {
      socket.emit("room join", { roomJoined, username });
      navigate(`/room/${roomJoined}`);
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

  useEffect(() => {
    socket.on("room taken", handleRoomTaken);
    socket.on("room available", handleRoomAvailable);
    return () => {
      socket.off("room taken", handleRoomTaken);
      socket.off("room available", handleRoomAvailable);
    };
  }, [handleRoomTaken, handleRoomAvailable]);
  return (
    <>
      <BackButton />
      <Settings />
      <div className={styles.page_container}>
        <div className={styles.part_container}>
          <h1 className={styles.heading}>Create a Room</h1>
          <div className={styles.form_container}>
            <form onSubmit={handleCreateRoom} className={styles.form}>
              <input
                type="text"
                placeholder="Enter room number"
                value={roomCreate}
                onChange={(e) => setRoomCreate(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                create
              </button>
            </form>
          </div>
        </div>

        <div className={styles.part_container}>
          <h1 className={styles.heading}>Join a Room</h1>
          <div className={styles.form_container}>
            <form onSubmit={handleJoinRomm} className={styles.form}>
              <input
                type="text"
                placeholder="Enter room number"
                value={roomJoined}
                onChange={(e) => setRoomJoined(e.target.value)}
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

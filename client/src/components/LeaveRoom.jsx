// LeaveRoom.jsx

//React imports
import React from "react";
import { useNavigate } from "react-router-dom";

//Styles and Icons
import LogoutIcon from "@mui/icons-material/Logout";

//Context
import { useUser } from "../Context/UserProvider";
import { useSocket } from "../Context/SocketProvider";
const LeaveRoom = () => {
  const naviagte = useNavigate();
  const { roomJoined, setRoomJoined, username } = useUser();
  const socket = useSocket();

  const handleLeaveRoom = () => {
    socket.emit("leave room", { username: username, room: roomJoined });
    setRoomJoined("");
    naviagte("/room");
  };

  return (
    <div
      style={{
        backgroundColor: "var(--form-bg-color)",
        position: "absolute",
        top: "25px",
        left: "35px",
        transform: "translateX(-50%)",
        color: "red",
        width: "35px",
        height: "30px",
        border: "1px solid var(--text-color)",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        padding: "3px",
      }}
      onClick={handleLeaveRoom}
    >
      <LogoutIcon />
    </div>
  );
};

export default LeaveRoom;

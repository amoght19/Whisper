//React imports
import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

//Context
const SocketContext = createContext(null);

//Custom hook to get user data
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

//SocketProvider to wrap our component
export const SocketProvider = (props) => {
  //Connecting to node server
  const socket = io("https://whisper-wo62.onrender.com");

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

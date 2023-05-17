import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

export const UserProvider = (props) => {
  const [username, setUsername] = useState("");
  const [roomJoined, setRoomJoined] = useState("");
  const [sound, setSound] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dimmedBackground, setDimmedBackground] = useState(false);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        roomJoined,
        setRoomJoined,
        darkMode,
        setDarkMode,
        sound,
        setSound,
        dimmedBackground,
        setDimmedBackground,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

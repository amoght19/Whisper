import React, { useEffect } from "react";
import Chat from "./Chat";
import Room from "./room";
import { Routes, Route } from "react-router-dom";
import Sign from "./Sign";
import { useUser } from "./Context/UserProvider";

function App() {
  const { darkMode } = useUser();

  //Useffect for dark Mode Changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <Routes>
        <Route path="/room/:roomId" element={<Chat />} />
        <Route path="/" element={<Sign />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </>
  );
}

export default App;

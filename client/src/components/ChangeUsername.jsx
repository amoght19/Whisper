//React imports
import React, { useState } from "react";

//Context
import { useUser } from "../Context/UserProvider";

//Styles
import styles from "../styles/ChangeUsername.module.css";

const ChangeUsername = ({ setIsUsernameToBeChanged }) => {
  const { username, setUsername, setDimmedBackground } = useUser();
  const [tempUsername, setTempUsername] = useState("");

  const handleUsernameChange = (e) => {
    e.preventDefault();
    if (tempUsername == "") {
      alert("Username cannot be empty");
    } else {
      setUsername(tempUsername);
      setIsUsernameToBeChanged(false);
      setDimmedBackground(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button_cancel}
        onClick={() => {
          setIsUsernameToBeChanged(false);
          setDimmedBackground(false);
        }}
      >
        X
      </button>
      <h1 className={styles.heading}>Change Username</h1>
      <form onSubmit={handleUsernameChange} className={styles.form}>
        <input
          value={tempUsername}
          className={styles.input}
          onChange={(e) => {
            setTempUsername(e.target.value);
          }}
          placeholder={"New username"}
        />
        <button className={styles.button} type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ChangeUsername;

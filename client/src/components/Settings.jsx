import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "../styles/Settings.module.css";
import { useState } from "react";
import { useUser } from "../Context/UserProvider";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ChangeUsername from "./ChangeUsername";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUsernameToBeChanged, setIsUsernameToBeChanged] = useState(false);
  const { sound, setSound, darkMode, setDarkMode, setDimmedBackground } =
    useUser();

  const handleChangeUsername = () => {
    setIsOpen(false);
    setIsUsernameToBeChanged(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setDimmedBackground(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setDimmedBackground(false);
  };

  return (
    <div>
      <div className={styles.settings} onClick={handleOpen}>
        <SettingsIcon className={styles.icon} />
      </div>

      {isOpen && (
        <div className={styles.SlidingMenu}>
          <button className={styles.closing_button} onClick={handleClose}>
            <CloseIcon />
          </button>
          <ul className={styles.list_items}>
            <li
              className={`${styles.item} ${styles.person}`}
              onClick={handleChangeUsername}
            >
              Change Username <PersonIcon className={styles.icon} />
            </li>
            <li
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className={`${styles.item} ${styles.dark}`}
            >
              {darkMode ? "Light" : "Dark"} Mode
              {darkMode ? (
                <WbSunnyIcon className={styles.icon} />
              ) : (
                <DarkModeIcon className={styles.icon} />
              )}
            </li>

            <li
              onClick={() => {
                setSound(!sound);
              }}
              className={styles.item}
            >
              Sound {sound ? "off" : "on"}
              {sound ? (
                <MusicOffIcon className={styles.icon} />
              ) : (
                <MusicNoteIcon className={styles.icon} />
              )}
            </li>
          </ul>
        </div>
      )}
      {isUsernameToBeChanged && (
        <ChangeUsername setIsUsernameToBeChanged={setIsUsernameToBeChanged} />
      )}
    </div>
  );
};

export default Settings;

//BackButton.jsx

//React imports
import React from "react";
import { useNavigate } from "react-router-dom";

//Styles and Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../styles/BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div onClick={handleBackClick} className={styles.back_button}>
      <ArrowBackIcon className={styles.icon} />
    </div>
  );
};

export default BackButton;

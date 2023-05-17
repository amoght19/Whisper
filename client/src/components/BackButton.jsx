import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../styles/BackButton.module.css";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div onClick={handleBackClick} className={styles.back_button}>
      <ArrowBackIcon className={styles.icon} />
    </div>
  );
};

export default BackButton;

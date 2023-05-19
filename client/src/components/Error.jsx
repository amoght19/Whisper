import React, { useEffect, useState } from "react";
import styles from "../styles/Error.module.css"; // Import the CSS file for custom styling

const Error = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 800); // Set the time in milliseconds after which the div should vanish

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  return (
    <div
      className={`${styles.vanishingDiv} ${
        visible ? styles.visible : styles.hidden
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Error;

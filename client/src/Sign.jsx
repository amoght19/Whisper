//Sign.jsx

//React imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useUser } from "./Context/UserProvider";

//Styles and images
import styles from "./styles/sign.module.css";
import eye from "./assets/eye.png";

//Component
import Error from "./components/Error";

const Sign = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [input, setInput] = useState("");
  let timer;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input == "") {
      setErrorMessage("Enter a username");
      setIsDivVisible(true);
    } else {
      setUsername(input);
      navigate("/room");
    }
  };

  //UseEffect for errors
  useEffect(() => {
    if (isDivVisible && errorMessage) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsDivVisible(false);
      }, 800);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage, isDivVisible]);
  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.form_container}>
          <div className={styles.image_container}>
            <img src={eye} alt="eye" className={styles.eye_image} />
          </div>

          <h1 className={styles.app_name}>Whisper</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a Username"
              value={input}
              className={styles.input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className={styles.button} type="submit">
              Start
            </button>
          </form>
        </div>
      </div>
      {isDivVisible && <Error message={errorMessage} />}
    </>
  );
};

export default Sign;

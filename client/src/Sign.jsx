import React from "react";
import { useUser } from "./Context/UserProvider";
import { useNavigate } from "react-router-dom";
import styles from "./styles/sign.module.css"
import eye from "./assets/eye.png"

const Sign = () => {
  const { username, setUsername } = useUser();
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username == "") alert("Please enter a name");
    else {
      navigate('/room')
    }
  };
  return (
    <div className={styles.page_container}>
      <div className={styles.form_container}>
        <div className={styles.image_container}>
        <img src={eye} alt="eye" className={styles.eye_image}/>
        </div>

      <h1 className={styles.app_name}>Whisper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a Username"
          value={username}
          className={styles.input}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className={styles.button} type="submit">Start</button>
      </form>
      </div>
    </div>
  );
};

export default Sign;

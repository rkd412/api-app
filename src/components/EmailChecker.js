import React, { useState, useEffect } from "react";

import validator from "validator";

import styles from "./EmailChecker.module.css";

const EmailChecker = () => {
  const [isSafe, setIsSafe] = useState("neutral");
  const [emailToCheck, setEmailToCheck] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [items, setItems] = useState(null);

  const submitHandler = (e) => {
    if (!validator.isEmail(emailToCheck)) {
      alert("Enter valid email!");
      setIsSafe("neutral");
    } else {
      e.preventDefault();
      fetch(
        "https://cors-anywhere.herokuapp.com/https://emailrep.io/example@gmail.com",
        {
          method  : 'GET',
          headers: {
            "User-Agent": "RKD412",
          },
        }
      ).then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
          console.log(result);
        },

        (error) => {
          setError(error);
          setIsLoaded(true);
          console.log(error);
        }
      );
    }
  };

  const valueChangeHandler = (e) => {
    e.preventDefault();
    setEmailToCheck(e.target.value);
    console.log("https://emailrep.io/" + emailToCheck);
  };

  return (
    <div
      className={
        isSafe === "neutral"
          ? styles["neutral"]
          : isSafe === "safe"
          ? styles["safe"]
          : styles["unsafe"]
      }
    >
      <h1>Email Safety Checker</h1>
      <label>
        <input
          type="text"
          name="URL"
          placeholder="Enter email here..."
          onChange={valueChangeHandler}
        />
      </label>
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default EmailChecker;

import React, { useState } from "react";

import validator from "validator";

import styles from "./EmailChecker.module.css";

const EmailChecker = () => {
  const [isSafe, setIsSafe] = useState("neutral");
  const [emailToCheck, setEmailToCheck] = useState("");

  const submitHandler = (e) => {
    if (!validator.isEmail(emailToCheck)) {
      alert("Enter valid email!");
      setIsSafe("neutral");
    } else {
      fetch("https://cors-anywhere.herokuapp.com/https://emailrep.io/rkdavis15@gmail.com", {
        headers: {
          "User-Agent": "https://infallible-khorana-72773f.netlify.app/",
         
        },
      }).then(
        (result) => {
          console.log(result);
        },

        (error) => {
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

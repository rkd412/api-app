import React, { useState } from "react";

import validator from "validator";

import styles from "./EmailChecker.module.css";

const EmailChecker = () => {
  const [emailToCheck, setEmailToCheck] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpam, setIsSpam] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const submitHandler = (e) => {
    if (!validator.isEmail(emailToCheck)) {
      alert("Enter valid email!");
      setIsSpam(null);
    } else {
      setIsSent(true);
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://api.eva.pingutil.com/email?email=" + { emailToCheck },
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setIsSpam(result.data.spam);
          setIsLoaded(true);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const valueChangeHandler = (e) => {
    e.preventDefault();
    setEmailToCheck(e.target.value);
    setIsLoaded(false);
    setIsSent(false);
    setIsSpam(null);
  };

  return (
    <div
      className={
        isSpam === null
          ? styles["neutral"]
          : isSpam === true
          ? styles["unsafe"]
          : styles["safe"]
      }
    >
      <h1>Address Spam Checker</h1>
      <label>
        <input
          type="text"
          name="URL"
          placeholder="Enter email here..."
          onChange={valueChangeHandler}
        />
      </label>
      <button onClick={submitHandler}>Submit</button>
      {isSent && !isLoaded && (
        <div>
          <h3>Loading...</h3>
        </div>
      )}
      {isSpam && isLoaded && (
        <div>
          <h3>Beware!!! SPAM!!!</h3>
        </div>
      )}

      {!isSpam && isLoaded && (
        <div>
          <h3>Doesn't look like Spam!</h3>
        </div>
      )}
    </div>
  );
};

export default EmailChecker;

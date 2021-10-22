import React, { useState, useEffect } from "react";

import styles from "./PasswordGenerator.module.css";

const PasswordGenerator = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(
      "https://passwordinator.herokuapp.com/generate?num=true&char=true&caps=true&len=14"
    )
      .then((result) => result.json())
      .then(
        (result) => {
          setNewPassword(result);
          setIsLoaded(true);
        },

        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(newPassword.data);
    window.alert("Password copied to clipboard.");
  };

  useEffect(
    () =>
      isLoaded
        ? console.log(newPassword) && console.log(error)
        : "The fuck happened?",
    [isLoaded, newPassword, error]
  );

  return (
    <div className={styles["container"]}>
      <h1>Password Generator</h1>
      {isLoaded && newPassword ? (
        <h3 className={styles["clickable"]} onClick={copyHandler}>
          {newPassword.data}
        </h3>
      ) : (
        <h3>**************</h3>
      )}
      <button onClick={submitHandler}>
        New Password
      </button>
    </div>
  );
};

export default PasswordGenerator;

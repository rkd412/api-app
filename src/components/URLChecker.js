import React, { useState, useEffect } from "react";

import validator from "validator";

import styles from "./URLChecker.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const API_URL =
  "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + API_KEY;

const URLChecker = () => {
  const [isSafe, setIsSafe] = useState("neutral");
  const [urlToCheck, setUrlToCheck] = useState("");
  const [isLoaded, setIsLoaded] = useState(null);
  const [items, setItems] = useState("");

  const submitHandler = (e) => {
    if (!validator.isURL(urlToCheck)) {
      alert("Enter valid URL!");
    } else {
      e.preventDefault();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: {
            clientId: "rkd412",
            clientVersion: "1.0",
          },

          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["WINDOWS"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: urlToCheck }],
          },
        }),
      };

      fetch(API_URL, requestOptions)
        .then((result) => result.json())
        .then(
          (result) => {
            setItems(result);
            setIsLoaded(true);
            setIsLoaded(false);
          },

          (error) => {
            console.log(error);
            setIsLoaded(true);
            setIsLoaded(false);
          }
        );
    }
  };

  const valueChangeHandler = (e) => {
    e.preventDefault();
    setUrlToCheck(e.target.value);
    setIsSafe("neutral");
  };

  useEffect(() => {
    if (items === "") {
      setIsSafe("neutral");
    } else if (Object.entries(items).length === 0) {
      setIsSafe("safe");
    } else {
      setIsSafe("unsafe");
    }
  }, [isLoaded, items]);

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
      <h1>URL Safety Checker</h1>
      <label>
        <input
          type="text"
          name="URL"
          placeholder="Enter URL here..."
          onChange={valueChangeHandler}
        />
      </label>
      <button onClick={submitHandler}>Submit</button>
      {items && isSafe === "unsafe" && (
        <p className={styles["clickable"]}>
          {items.matches[0].threatType} - DO NOT USE!!!
        </p>
      )}
      {items && isSafe === "safe" && <p>Seems safe!</p>}
    </div>
  );
};

export default URLChecker;

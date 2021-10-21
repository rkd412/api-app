import React, { useState, useEffect } from "react";

import styles from "./SafeBrowser.module.css";

const SafeBrowser = () => {
  const [isSafe, setIsSafe] = useState("neutral");
  const [urlToCheck, setUrlToCheck] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [items, setItems] = useState("");

  const submitHandler = (e) => {
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

    fetch("", requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
          setIsLoaded(false);
        },

        (error) => {
          setError(error);
          setIsLoaded(true);
          setIsLoaded(false);
        }
      );
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

  useEffect(
    () =>
      isLoaded
        ? console.log(items) && console.log(error)
        : "The fuck happened?",
    [isLoaded, items, error]
  );

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
      <button onClick={submitHandler} type="button" value="Submit">
        Submit
      </button>
      {items && isSafe === "unsafe" ? (
        <p className={styles["clickable"]}>{items.matches[0].threatType}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default SafeBrowser;

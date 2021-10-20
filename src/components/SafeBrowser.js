import React, { useState, useEffect } from "react";

import styles from "./SafeBrowser.module.css";

const SafeBrowser = () => {
  const [isSafe, setIsSafe] = useState(null);
  const [urlToCheck, setUrlToCheck] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [items, setItems] = useState(null);

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

    fetch(
      "",
      requestOptions
    )
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
  };

  useEffect(() => {
    if (items === []) {
      setIsSafe(true);
    } else if (items === []) {
      setIsSafe(false);
    }
  }, [isLoaded]);

  useEffect(
    () =>
      isLoaded
        ? console.log(items) && console.log(error)
        : "The fuck happened?",
    [isLoaded]
  );

  return (
    <div
      className={
        isSafe === null
          ? styles[""]
          : isSafe === "safe"
          ? styles["safe"]
          : styles["not-safe"]
      }
    >
      <h1>URL Safety Check</h1>
      <form>
        <label>
          <input
            type="text"
            name="URL"
            placeHolder="Enter URL here..."
            onChange={valueChangeHandler}
          />
        </label>
        <button onClick={submitHandler} type="button" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SafeBrowser;

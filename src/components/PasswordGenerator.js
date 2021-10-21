import React, { useState, useEffect } from "react";

import styles from "./PasswordGenerator.module.css";

const PasswordGenerator = () => {
  const [isSafe, setIsSafe] = useState("");
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
      "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyDg3gYkdfwSjTFl3492xScXAOYfKGTM2ns",
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
    if (items === null) {
      setIsSafe("");
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

  return <div>hello world</div>;
};

export default PasswordGenerator;

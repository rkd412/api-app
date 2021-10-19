import React, { useState, useEffect } from "react";

const SafeBrowser = () => {
  const [formValue, setFormValue] = useState([]);
  const [urlToCheck, setUrlToCheck] = useState([]);
  const [error, setError] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
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
          threatEntries: [
            { url: "https://testsafebrowsing.appspot.com/s/phishing.html" },
            { url: "https://testsafebrowsing.appspot.com/s/malware.html" },
            {
              url: "https://testsafebrowsing.appspot.com/s/malware_in_iframe.html",
            },
          ],
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
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleValueChange = (e) => {
    e.preventDefault();
    setFormValue(e.target.value);
    console.log(formValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrlToCheck(formValue);
    console.log(items);
    console.log(error);
  };

  return (
    <>
      <h1>Security Check</h1>
      <form>
        <label>
          Check URL
          <input type="text" name="URL" onChange={handleValueChange} />
        </label>
        <button onClick={handleSubmit} type="button" value="Submit">
          Submit
        </button>
        <div>{urlToCheck}</div>
        <div>
          {" "}
          The data is <b>{isLoaded ? "currently" : "not"}</b> loaded.
        </div>
      </form>
    </>
  );
};

export default SafeBrowser;

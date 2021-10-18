import React, { useState, useEffect } from "react";

const SafeBrowser = () => {
  const [formValue, setFormValue] = useState([]);
  const [urlToCheck, setUrlToCheck] = useState([]);
  const [error, setError] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
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
      },
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
        {items.map((d) => (
          <div>{d}</div>
        ))}
      </form>
    </>
  );
};

export default SafeBrowser;

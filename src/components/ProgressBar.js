import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/ProgressBar.css"; // Import the CSS file for styling

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [data, setData] = useState(null);
  const source = useRef(axios.CancelToken.source());
  const [inputAPIURI, setInputAPIURI] = useState("https://official-joke-api.appspot.com/random_joke");
  useEffect(() => {
    if (isLoading) {
      let progressInterval;

      if (!hasError && !isCancelled) {
        progressInterval = setInterval(() => {
          setProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
        }, 500);
      }

      return () => clearInterval(progressInterval);
    }
  }, [isLoading, hasError, isCancelled]);
  const handleAPIURIChange = (e) => {
    setInputAPIURI(e.target.value);
  };
  const startRequest = async () => {
    setData(null);
    if (inputAPIURI === "") {
      setHasError(true);
      return;
    }
    setIsLoading(true);
    setHasError(false);
    setIsCancelled(false);
    setProgress(0);
    
    try {
      const response = await axios.get(
        inputAPIURI,
        {
          cancelToken: source.current.token,
          timeout: 20000, // 20 Seconds timeout
          onDownloadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setProgress(100);
      setData(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        setIsCancelled(true);
      } else if (error.code === "ECONNABORTED") {
        setHasError(true);
      } else {
        setHasError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelRequest = () => {
    if (source.current) {
      source.current.cancel("Operation canceled by the user.");
    }
  };

  return (
    <div className="progress-bar-component">
      <div className="button-group">
        <input
          type="text"
          value={inputAPIURI}
          onChange={handleAPIURIChange}
          placeholder="Enter API full URL"
        />
        <button onClick={startRequest} disabled={isLoading}>
          Start API Request
        </button>
        <button onClick={cancelRequest} disabled={!isLoading}>
          Cancel Request
        </button>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: hasError
              ? "red"
              : isCancelled
              ? "orange"
              : "green",
          }}
        />
      </div>
      {hasError && (
        <p className="error-text">An error occurred. Please try again.</p>
      )}
      {isCancelled && <p className="cancel-text">Request cancelled.</p>}
      {data && (
        <div className="data-display">
          <h3>API Response:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      <h3>Explanation</h3>
      <ol>
        <li>
          <p>
            <strong>State for API Data</strong>:
          </p>
          <ul>
            <li>
              <code>data</code>: State to store the API response data.
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>
              Updating <code>startRequest</code>
            </strong>
            :
          </p>
          <ul>
            <li>
              Reset <code>data</code> to <code>null</code> when a new request
              starts.
            </li>
            <li>
              Set <code>data</code> with the response from the API if the
              request is successful.
            </li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Render</strong>:
          </p>
          <ul>
            <li>
              Added a section to display the API response data if it exists (
              <code>data</code> is not null).
            </li>
            <li>
              Use a <code>&lt;pre&gt;</code> tag to format the JSON response for
              better readability.
            </li>
          </ul>
        </li>
      </ol>
      <p>
        This component will fetch data from the API, display the progress of the
        request, handle errors and cancellations, and show the API response once
        the request is complete.
      </p>
    </div>
  );
};

export default ProgressBar;

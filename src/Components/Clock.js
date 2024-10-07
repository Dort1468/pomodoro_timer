import { useState, useEffect } from "react";
import React from "react";

const Clock = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            document.getElementById("beep").play();
            setIsSession(!isSession);
            return isSession ? breakLength * 60 : sessionLength * 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, isSession, breakLength, sessionLength]);

  const startStopHandler = () => {
    setIsRunning((prev) => !prev);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setIsSession(true);
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  };

  const incrementDecrementHandler = (type, operation) => {
    if (type === "session") {
      if (operation === "+" && sessionLength < 60) {
        setSessionLength((prev) => prev + 1);
        if (isSession) {
          setTimeLeft((prev) => prev + 60);
        }
      } else if (operation === "-" && sessionLength > 1) {
        setSessionLength((prev) => prev - 1);
        if (isSession) {
          setTimeLeft((prev) => prev - 60);
        }
      }
    } else if (type === "break") {
      if (operation === "+" && breakLength < 60) {
        setBreakLength((prev) => prev + 1);
      } else if (operation === "-" && breakLength > 1) {
        setBreakLength((prev) => prev - 1);
      }
    }
  };

  return (
    <div>
      <div id="wrapper">
        <div id="container">
          <h1>25 + 5 Clock</h1>
          <div id="length-session">
            <div className="length-control">
              <div>
                <div id="break-label">Break Length</div>
                <button
                  className="btn-level"
                  id="break-decrement"
                  onClick={() => incrementDecrementHandler("break", "-")}
                >
                  -
                </button>
                <div className="btn-level" id="break-length">
                  {breakLength}
                </div>
                <button
                  className="btn-level"
                  id="break-increment"
                  onClick={() => incrementDecrementHandler("break", "+")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="length-control">
              <div id="session-label">Session Length</div>
              <button
                className="btn-level"
                id="session-decrement"
                value="-"
                onClick={() => incrementDecrementHandler("session", "-")}
              >
                -
              </button>
              <div className="btn-level" id="session-length">
                {sessionLength}
              </div>
              <button
                className="btn-level"
                id="session-increment"
                onClick={() => incrementDecrementHandler("session", "+")}
              >
                +
              </button>
            </div>
          </div>
          <div className="timer">
            <div className="timer-wrapper">
              <div id="timer-label">{isSession ? "Session" : "Break"}</div>
              <div id="timer-left">{formatTime(timeLeft)}</div>
            </div>
          </div>
          <div className="timer-control">
            <button id="start_stop" onClick={startStopHandler}>
              {isRunning ? "Pause" : "Start"}
            </button>
            <button id="reset" onClick={resetHandler}>
              Reset
            </button>
          </div>
          <audio
            id="beep"
            preload="auto"
            src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
          ></audio>
        </div>
      </div>
    </div>
  );
};

export default Clock;

import { useEffect, useRef, useState } from "react";

function App() {
  // const [millisecondsRef.current, setMilliseconds] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  const [timeToShow, setTimeToShow] = useState("00 : 00");
  const [interval, setTheInterval] = useState<NodeJS.Timer | null>(null);
  const [timerState, setTimerState] = useState<"idle" | "counting" | "paused">("idle");

  const millisecondsRef = useRef<number>(0);
  const secondsRef = useRef<number>(0);

  const showFormattedTime = () => {
    let milliseconds = millisecondsRef.current.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
    let seconds = secondsRef.current.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
    setTimeToShow(seconds + " : " + milliseconds);
  };

  const stratTimer = () => {
    const newInterval = setInterval(() => {
      console.log("Yaooo [millisecondsRef.current: " + millisecondsRef.current + " ]");
      if (millisecondsRef.current < 99) {
        millisecondsRef.current = millisecondsRef.current + 1;
        showFormattedTime();
      } else {
        millisecondsRef.current = 0;
        secondsRef.current = secondsRef.current + 1;
        showFormattedTime();
      }
    }, 10);
    setTheInterval(newInterval);
    setTimerState("counting");
  };

  const pauseTimer = () => {
    if (interval) {
      clearInterval(interval);
      setTimerState("paused");
    }
  };
  const resumeTimer = () => {
    const newInterval = setInterval(() => {
      if (millisecondsRef.current < 99) {
        millisecondsRef.current = millisecondsRef.current + 1;
        showFormattedTime();
      } else {
        millisecondsRef.current = 0;
        secondsRef.current = secondsRef.current + 1;
        showFormattedTime();
      }
    }, 10);
    setTheInterval(newInterval);
    setTimerState("counting");
  };

  const resetTimer = () => {
    if (interval) {
      clearInterval(interval);
      setTimeToShow("00 : 00")
      millisecondsRef.current = 0;
      secondsRef.current = 0;
      setTimerState("idle");
    }
  };

  return (
    <div className="App">
      <div className="timer">
        <span>{timeToShow}</span>
      </div>
      <div>
        {timerState === "idle" && <button onClick={stratTimer}>Start</button>}
        {timerState === "counting" && <button onClick={pauseTimer}>Pause</button>}
        {timerState === "paused" && <button onClick={resumeTimer}>Resume</button>}
        {timerState !== "idle" && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}

export default App;

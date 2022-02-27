import React, {useEffect} from "react";
import QuizMainBody from "./QuizMainBody";

const CountDownTimer = ({hoursMinSecs}) => {
  const {hours = 0, minutes = 0, seconds = 60} = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    // if (hrs === 0 && mins === 0 && secs === 0) reset();
    if (hrs === 0 && mins === 0 && secs === 0) {
      // reset();
      <QuizMainBody/>
    }
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <>
      {/* <p>{`${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</p> */}

     {`${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}
    </>
  );
};

export default CountDownTimer;

import { useEffect } from "react";
import { useState } from "react";

const CountDownTimer = () => {
  const [timer, setTimer] = useState({ hours: "", minutes: "", seconds: "" });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const { hours, minutes, seconds } = prevTimer;

          // convert string to number

          let hour = parseInt(hours || 0);
          let minute = parseInt(minutes || 0);
          let second = parseInt(seconds || 0);

          // when end time
          if (hour === 0 && minute === 0 && second === 0) {
            setIsRunning((prev) => !prev);
            clearInterval(interval);
            return { hours: "", minutes: "", seconds: "" };
          }

          // main counter logic

          if (second > 0) {
            second--;
          } else if (minute > 0) {
            minute--;
            second = 59;
          } else if (hour > 0) {
            hour--;
            minute = 59;
            second = 59;
          }

          return {
            hours: hour < 10 ? `0${hour}` : `${hour}`,
            minutes: minute < 10 ? `0${minute}` : `${minute}`,
            seconds: second < 10 ? `0${second}` : `${second}`,
          };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 2) {
      return;
    }

    if ((name === "minutes" || name === "seconds") && parseInt(value) > 59) {
      return;
    }
    setTimer({ ...timer, [name]: value });
  };

  const handleStart = () => {
    const { hours, minutes, seconds } = timer;

    if (
      (!hours && !minutes && !seconds) ||
      (hours === 0 && minutes === 0 && seconds === 0)
    ) {
      return;
    }

    setIsRunning((prev) => !prev);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer({ hours: "", minutes: "", seconds: "" });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Main Card */}
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl gap-8 w-auto">
        {/* Title */}
        <span className="text-3xl font-bold text-gray-700 tracking-wide">
          Countdown Timer
        </span>

        {/* Timer Input Section */}
        <div className="flex items-end justify-center gap-4">
          {/* Hours Block */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-semibold text-gray-500 uppercase">
              Hours
            </label>
            <input
              type="number"
              name="hours"
              value={timer.hours}
              onChange={handleChange}
              placeholder="00"
              disabled={isRunning}
              className="w-20 h-20 text-center text-4xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Colon */}
          <span className="text-4xl font-bold text-gray-400 pb-5">:</span>

          {/* Minutes Block */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-semibold text-gray-500 uppercase">
              Minutes
            </label>
            <input
              type="number"
              name="minutes"
              value={timer.minutes}
              onChange={handleChange}
              disabled={isRunning}
              placeholder="00"
              className="w-20 h-20  text-center text-4xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Colon */}
          <span className="text-4xl font-bold text-gray-400 pb-5">:</span>

          {/* Seconds Block */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-semibold text-gray-500 uppercase ">
              Seconds
            </label>
            <input
              type="number"
              name="seconds"
              value={timer.seconds}
              onChange={handleChange}
              disabled={isRunning}
              placeholder="00"
              className="w-20 h-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center text-4xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors "
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition transform active:scale-95"
            >
              Start
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition transform active:scale-95"
            >
              Stop
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow transition transform active:scale-95"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;

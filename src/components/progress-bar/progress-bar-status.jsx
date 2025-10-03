import { useState } from "react";
import { useEffect } from "react";
import getBarColor from "./utils/getBarColor";

const ProgressBarStatus = ({ progress }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);
  return (
    <div className="border overflow-hidden  border-black w-1/2 h-10  rounded-full ">
      <div
        className={`p-2 text-white font-bold  rounded-full h-full text-right transition-all duration-500 ease-in-out ${getBarColor(
          animationProgress
        )}`}
        style={{
          // width: `${animationProgress}%`
          transform: `translateX(${animationProgress - 100}%)`,
        }}
        role="animationProgressbar"
        aria-valuenow={animationProgress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuetext={`${animationProgress}% completed`}
      >
        {animationProgress}%
      </div>
    </div>
  );
};

export default ProgressBarStatus;

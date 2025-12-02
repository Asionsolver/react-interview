import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [current, setCurrent] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [margin, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);
  //   console.log(stepRef);
  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
    // console.log(stepRef.current[0].offsetWidth);
    // console.log(stepRef.current[stepsConfig.length - 1].offsetWidth);
  }, [stepsConfig.length, stepRef]);

  if (!stepsConfig.length) {
    return <div>There is no step available.</div>;
  }

  const handleNext = () => {
    setCurrent((prev) => {
      if (prev === stepsConfig.length) {
        setIsCompleted(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((current - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponents = stepsConfig[current - 1]?.Component;

  return (
    <div className="w-full">
      <div className="stepper relative flex justify-between items-center my-10">
        {stepsConfig.map((step, index) => {
          return (
            <div
              className={`step  flex flex-col items-center relative`}
              key={index}
              ref={(el) => (stepRef.current[index] = el)}
            >
              <div
                className={`step-number w-12.5 h-12.5 rounded-full text-white bg-[#ccc] flex items-center justify-center mb-1.5 z-2  ${
                  current > index + 1 || isCompleted ? "bg-green-500" : ""
                }
                }  ${current === index + 1 ? "bg-blue-500" : "bg-gray-500"}`}
              >
                {current > index + 1 || isCompleted ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name text-xl">{step.name}</div>
            </div>
          );
        })}
        <div
          className="absolute top-[25%] left-0 h-1 bg-[#ccc]"
          style={{
            width: `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
            marginLeft: margin.marginLeft,
            marginRight: margin.marginRight,
          }}
        >
          <div
            className="bg-green-500 h-full transition-all ease duration-200"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
      <ActiveComponents />
      {!isCompleted && (
        <button
          onClick={handleNext}
          className={`px-3 py-2 w-1/12 bg-amber-500 hover:bg-amber-700 `}
        >
          {stepsConfig.length === current ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default CheckoutStepper;

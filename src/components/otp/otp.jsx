import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const OTP_DIGIT_LENGTH = 5;
const RESEND_DELAY = 30; // seconds
const Otp = () => {
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGIT_LENGTH).fill("")
  );
  const [timer, setTimer] = useState(RESEND_DELAY);
  const [canResend, setCanResend] = useState(false);
  const refArray = useRef([]);

  useEffect(() => {
    refArray.current[0]?.focus();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    // console.log(value);
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    if (newValue && index < OTP_DIGIT_LENGTH - 1) {
      refArray.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // console.log(e);
    if (!e.target.value && e.key === "Backspace") {
      refArray.current[index - 1]?.focus();
    }
  };

  // Handle resend button click
  const handleResend = () => {
    setInputArr(new Array(OTP_DIGIT_LENGTH).fill(""));
    setTimer(RESEND_DELAY);
    setCanResend(false);
    refArray.current[0]?.focus();
    console.log("🔁 OTP resent to user");
    // api call to resend otp
  };

  // auto-submit when OTP complete
  useEffect(() => {
    if (inputArr.every((v) => v !== "")) {
      const otp = inputArr.join("");
      console.log("✅ OTP Complete:", otp);
      // verifyOTP(otp);
    }
  }, [inputArr]);

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, OTP_DIGIT_LENGTH);
    if (!/^\d+$/.test(pastedData)) return;
    const arr = pastedData.split("");
    setInputArr(arr);
    refArray.current[arr.length - 1]?.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Validate OTP</h1>
      <div className="flex space-x-4">
        {inputArr.map((input, index) => (
          <input
            key={index}
            type="text"
            className="w-12 h-12 border border-gray-300 rounded text-center text-2xl"
            value={inputArr[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            ref={(input) => (refArray.current[index] = input)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
          />
        ))}
      </div>
      {/* Timer and Resend Section */}
      <div className="text-center mt-6">
        {!canResend ? (
          <p className="text-gray-500">
            Resend available in{" "}
            <span className="font-semibold text-blue-600">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-blue-600 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default Otp;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
export const tenureDate = [12, 24, 36, 48, 60];
const LoanCalculator = () => {
  const [cost, setCost] = useState(0);
  const [interestRate, setInterestRate] = useState(5);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [loan, setLoan] = useState(0);
  const [tenure, setTenure] = useState(0);

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setLoan(0);
    }
    const l = calculateLoan(downPayment);
    setLoan(l);
  }, [tenure]);
  const calculateLoan = (downPayment) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    // 'P' (Principal Amount)
    // 'R' (Rate of Interest)
    // 'N' (Number of Years)

    if (!cost) {
      return;
    }

    const loanAmount = cost - downPayment;
    const interest = interestRate / 100;
    const year = tenure / 12;

    const emiCalculation =
      (loanAmount * interest * (1 + interest) ** year) /
      ((1 + interest) ** year - 1);

    return Number(emiCalculation / 12).toFixed(0);
  };

  const calCulateDownPayment = (loan) => {
    if (!cost) {
      return;
    }

    const downPaymentCalculation = 100 - (loan / calculateLoan(0)) * 100;
    return Number((downPaymentCalculation / 100) * cost).toFixed(0);
  };
  const handleUpdateLoan = (e) => {
    if (!cost) {
      return;
    }

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    // calculate the loan and updated
    const l = calculateLoan(dp);
    setLoan(l);
  };
  const handleUpdateDownPayment = (e) => {
    if (!cost) {
      return;
    }

    const l = Number(e.target.value);
    setLoan(l.toFixed(0));

    const dp = calCulateDownPayment(l);
    setDownPayment(dp);
  };

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      <h1 className="title text-3xl font-semibold uppercase text-center">
        Loan Calculator
      </h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">Total Cost of Asset</h2>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Enter total cost"
          name="cost"
          className="border border-gray-500 w-full p-2 text-lg rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">Interest Rate( in %)</h2>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
          name="interestRate"
          className="border border-gray-500 w-full p-2 text-lg rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">Processing Fee( in %)</h2>
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder="Enter processing fee"
          name="fee"
          className="border border-gray-500 w-full p-2 text-lg rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">Down Payment</h2>
        <input
          type="range"
          min={0}
          max={cost}
          value={downPayment}
          onChange={handleUpdateLoan}
          name="downPayment"
        />
        <div className="flex justify-between">
          <label htmlFor="downPayment">0%</label>
          <b>{downPayment}</b>
          <label htmlFor="downPayment">100%</label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">Loan Per Month</h2>
        <input
          type="range"
          min={calculateLoan(cost)}
          max={calculateLoan(0)}
          value={loan}
          onChange={handleUpdateDownPayment}
          name="loan"
        />
        <div className="flex justify-between">
          <label htmlFor="loan">{calculateLoan(cost)}</label>
          <b>{loan}</b>
          <label htmlFor="loan">{calculateLoan(0)}</label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium"> Tenure</h2>
        <div className="flex justify-between">
          {tenureDate.map((date, index) => {
            return (
              <button
                key={index}
                onClick={() => setTenure(date)}
                className={`px-4 py-3 rounded-full cursor-pointer font-semibold text-white ${
                  date === tenure ? "bg-green-500" : "bg-amber-500"
                }`}
              >
                {date}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;

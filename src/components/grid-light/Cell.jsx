import React from "react";

const Cell = ({ filled, onClick, isDisabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`border h-0 pb-[100%] ${
        filled ? "bg-green-500 " : "bg-transparent "
      } `}
    ></button>
  );
};

export default Cell;

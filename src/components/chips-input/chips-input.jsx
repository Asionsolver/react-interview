import { useState } from "react";
import { allChipSuggestions } from "../../data/chipSuggestions";
import { MdDelete } from "react-icons/md";
const ChipsInput = () => {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (!chips.includes(inputValue.trim())) {
        setChips([...chips, inputValue.trim()]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      setChips(chips.slice(0, -1));
    }
  };

  const removeChip = (index) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  const filteredSuggestions = allChipSuggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !chips.includes(suggestion)
  );

  const handleSuggestionClick = (suggestion) => {
    setChips([...chips, suggestion]);
    setInputValue("");
  };

  const clearAll = () => {
    setChips([]);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800  mb-4">Chips Input</h2>
      {/* Clear All button */}

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type a chip and press tag"
            className="border border-gray-300 rounded px-4 py-2"
            value={inputValue}
            onChange={handleValueChange}
            onKeyDown={handleKeyDown}
          />

          {chips.length > 0 && (
            <button
              onClick={clearAll}
              className="px-2 py-2 rounded bg-red-400 text-white text-sm  hover:bg-red-600 transition-all"
            >
              <MdDelete className="inline mb-0.5" size={20} />
            </button>
          )}
        </div>

        {inputValue.trim() !== "" && filteredSuggestions.length > 0 && (
          <div className="border border-gray-300 rounded mt-2 bg-white shadow w-auto max-h-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 text-gray-600 flex flex-wrap  max-w-2xl p-2 rounded gap-2">
        {chips.map((chip, index) => (
          <span
            key={index}
            className="bg-gray-200 rounded-full pl-3.5 pr-1.5 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            {chip}
            <button
              className="ml-2 text-gray-500  hover:text-white hover:bg-red-300 px-1.5 rounded-full cursor-pointer"
              onClick={() => removeChip(index)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChipsInput;

import { useState } from "react";
import { allChipSuggestions, categoryColors } from "../../data/chipSuggestions";
import { MdDelete } from "react-icons/md";
const ChipsInput = () => {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleValueChange = (e) => {
    setInputValue(e.target.value);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    const key = e.key;

    if (key === "ArrowDown" && filteredSuggestions.length > 0) {
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (key === "ArrowUp" && filteredSuggestions.length > 0) {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (key === "Enter") {
      if (activeIndex >= 0 && filteredSuggestions.length > 0) {
        // if suggestion is selected
        const selected = filteredSuggestions[activeIndex];
        setChips([...chips, selected]);
        setInputValue("");
        setActiveIndex(-1);
      } else if (inputValue.trim() !== "") {
        const newChipLabel = inputValue.trim();

        // Check if the chip already exists
        if (!chips.some((chip) => chip.label === newChipLabel)) {
          setChips([
            ...chips,
            { label: newChipLabel, category: "custom" }, // 👈 add in object form
          ]);
          setInputValue("");
        }
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      setChips(chips.slice(0, -1));
    }
  };

  const removeChip = (index) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  const filteredSuggestions = allChipSuggestions.filter(
    (s) =>
      s.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !chips.some((chip) => chip.label === s.label)
  );
  const handleSuggestionClick = (suggestion) => {
    setChips([...chips, suggestion]);
    setInputValue("");
    setActiveIndex(-1);
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
            {filteredSuggestions.map((s, index) => {
              const colorClass =
                categoryColors[s.category] || categoryColors.default;
              return (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(s)}
                  className={`px-4 py-2 cursor-pointer flex justify-between items-center ${
                    index === activeIndex ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  <span>{s.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${colorClass}`}>
                    {s.category}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 text-gray-600 flex flex-wrap  max-w-2xl p-2 rounded gap-2">
        {chips.map((chip, index) => {
          const colorClass =
            categoryColors[chip.category] || categoryColors.default;

          return (
            <span
              key={index}
              className={`pl-3.5 pr-1.5 py-1 text-sm font-semibold rounded-full flex items-center ${colorClass}`}
            >
              {chip.label}
              <button
                className="ml-2 text-gray-600 hover:text-white hover:bg-red-400 px-1.5 rounded-full cursor-pointer"
                onClick={() => removeChip(index)}
              >
                &times;
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ChipsInput;

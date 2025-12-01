import { useState, useEffect } from "react";

const SelectableGrid = () => {
  const [grid, setGrid] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false); // to track whether the mouse button is currently pressed
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);

  // Create the grid
  const createMatrix = () => {
    let matrix = [];
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        matrix.push({ pos: [i, j] });
      }
    }
    setGrid(matrix);
  };

  useEffect(() => {
    createMatrix();
  }, []);

  // When the mouse click starts
  const handleMouseDown = (pos) => {
    setIsMouseDown(true);
    setStartPos(pos);
    setEndPos(pos); // Initially, the End position will be the same as the Start position
  };

  // When the mouse drags over another box
  const handleMouseEnter = (pos) => {
    if (isMouseDown) {
      setEndPos(pos);
    }
  };

  // When the mouse is released
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  // Clear function
  const handleClear = () => {
    setStartPos(null);
    setEndPos(null);
  };

  // Selection check logic (using mathematical logic instead of a loop for faster performance)
  const checkIsSelected = (currPos) => {
    if (!startPos || !endPos) return false;

    const [r, c] = currPos;
    const [startR, startC] = startPos;
    const [endR, endC] = endPos;

    // Finding the minimum and maximum values to ensure it works even with reverse dragging
    const minRow = Math.min(startR, endR);
    const maxRow = Math.max(startR, endR);
    const minCol = Math.min(startC, endC);
    const maxCol = Math.max(startC, endC);

    // Return true if the current box is within this range
    return r >= minRow && r <= maxRow && c >= minCol && c <= maxCol;
  };

  return (
    // It's better to add a listener for mouseUp on the window or parent div to detect it throughout the document
    <div onMouseUp={handleMouseUp}>
      <div className="grid-container flex flex-col gap-5 justify-center items-center min-h-screen select-none">
        <h1 className="text-xl font-bold">Selectable Grid</h1>

        <div
          className="grid grid-cols-10 grid-rows-10"
          // Dragging will stop when the mouse leaves the grid
        >
          {grid.map((curItem, index) => {
            const isSelected = checkIsSelected(curItem.pos);

            return (
              <div
                key={index}
                // Event handler has been modified
                onMouseDown={() => handleMouseDown(curItem.pos)}
                onMouseEnter={() => handleMouseEnter(curItem.pos)}
                className={`w-10 h-10 border flex justify-center items-center cursor-pointer transition-colors duration-200 ${
                  isSelected
                    ? "border-green-400 bg-green-500 text-white"
                    : "border-violet-400 hover:bg-violet-200"
                }`}
              >
                {curItem.pos[0]}
                {curItem.pos[1]}
              </div>
            );
          })}
        </div>
        <div
          className="px-4 py-2 bg-red-500 hover:bg-red-700 cursor-pointer text-white rounded shadow-md"
          onClick={handleClear}
        >
          Clear Selection
        </div>
      </div>
    </div>
  );
};

export default SelectableGrid;

import { useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useRef } from "react";
import Portal from "./portal";

const ItemsPerPageDropdown = ({
  itemsPerPage,
  setShowDropdown,
  showDropdown,
  itemsPerPageOptions,
  handleItemsPerPageChange,
}) => {
  const dropdownRef = useRef(null);
  console.log(itemsPerPage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>Show: {itemsPerPage}</span>
        <FaAngleLeft
          className={`w-3 h-3 text-gray-400 transition-transform ${
            showDropdown ? "rotate-90" : "-rotate-90"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className=" absolute bottom-full right-0 mt-1 w-27 bg-gray-50 rounded-lg shadow-lg border border-gray-200 ">
          <div className="py-1">
            {itemsPerPageOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleItemsPerPageChange(option)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  itemsPerPage === option
                    ? "bg-amber-100 text-amber-800 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsPerPageDropdown;

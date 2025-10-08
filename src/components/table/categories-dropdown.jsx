import { useEffect } from "react";
import { useRef } from "react";
import { RiEqualizer2Line } from "react-icons/ri";

// Multiple Categories Dropdown Component
const CategoriesDropdown = ({
  products,
  categories,
  selectedCategories,
  setSelectedCategories,
  showCategoryDropdown,
  setShowCategoryDropdown,
  setCurrentPage,
  clearAllCategories,
}) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // Remove category if already selected
        return prev.filter((c) => c !== category);
      } else {
        // Add category if not selected
        return [...prev, category];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
      >
        <RiEqualizer2Line className="rotate-90" />
        <span>Categories</span>
        {selectedCategories.length > 0 && (
          <span className="bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {selectedCategories.length}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {showCategoryDropdown && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="p-3">
            {/* Header with Select All/Clear All */}
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
              <div className="text-sm font-semibold text-gray-700">
                Select Categories
              </div>
              <div className="flex gap-1">
                <button
                  onClick={selectAllCategories}
                  className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                >
                  All
                </button>
                <button
                  onClick={clearAllCategories}
                  className="text-xs text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Categories List */}
            <div className="max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <span
                    className={`flex-1 ${
                      selectedCategories.includes(category)
                        ? "text-amber-800 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {category}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {products.filter((p) => p.category === category).length}
                  </span>
                </label>
              ))}
            </div>

            {/* Selected Count */}
            {selectedCategories.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {selectedCategories.length} category selected
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;

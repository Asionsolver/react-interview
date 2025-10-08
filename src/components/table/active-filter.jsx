const ActiveFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  clearAllCategories,
}) => {
  return (
    <>
      {(searchTerm || selectedCategories.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                ×
              </button>
            </span>
          )}

          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-gray-600 self-center">
                Categories:
              </span>
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-800"
                >
                  {category}
                  <button
                    onClick={() =>
                      setSelectedCategories((prev) =>
                        prev.filter((c) => c !== category)
                      )
                    }
                    className="text-amber-600 hover:text-amber-800 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
              {selectedCategories.length > 1 && (
                <button
                  onClick={clearAllCategories}
                  className="text-xs text-gray-600 hover:text-gray-800 underline self-center"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          {(searchTerm || selectedCategories.length > 0) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategories([]);
              }}
              className="text-xs text-gray-600 hover:text-gray-800 underline self-center"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ActiveFilter;

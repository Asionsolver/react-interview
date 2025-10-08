import { getPriceFilterLabel, getStockFilterLabel } from "./helper/helper";

// components/ActiveFilter.jsx
const ActiveFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  priceFilter,
  setPriceFilter,
  statusFilter,
  setStatusFilter,
  stockFilter,
  setStockFilter,
}) => {
  const clearPriceFilter = () => {
    setPriceFilter({ min: "", max: "", type: "none" });
  };

  const clearStatusFilter = () => {
    setStatusFilter([]);
  };

  const clearStockFilter = () => {
    setStockFilter({ min: "", max: "", type: "none" });
  };

  const clearAllAdvancedFilters = () => {
    clearPriceFilter();
    clearStatusFilter();
    clearStockFilter();
  };

  const hasAdvancedFilters =
    priceFilter.type !== "none" ||
    statusFilter.length > 0 ||
    stockFilter.type !== "none";

  const hasAnyFilters =
    searchTerm || selectedCategories.length > 0 || hasAdvancedFilters;

  if (!hasAnyFilters) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {/* Search Filter */}
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

      {/* Categories Filter */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <span className="text-xs text-gray-600 self-center">Categories:</span>
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
        </div>
      )}

      {/* Price Filter */}
      {priceFilter.type !== "none" && (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
          Price: {getPriceFilterLabel(priceFilter)}
          <button
            onClick={clearPriceFilter}
            className="text-purple-600 hover:text-purple-800 ml-1"
          >
            ×
          </button>
        </span>
      )}

      {/* Status Filter */}
      {statusFilter.length > 0 && (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Status: {statusFilter.join(", ")}
          <button
            onClick={clearStatusFilter}
            className="text-green-600 hover:text-green-800 ml-1"
          >
            ×
          </button>
        </span>
      )}

      {/* Stock Filter */}
      {stockFilter.type !== "none" && (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
          Stock: {getStockFilterLabel(stockFilter)}
          <button
            onClick={clearStockFilter}
            className="text-orange-600 hover:text-orange-800 ml-1"
          >
            ×
          </button>
        </span>
      )}

      {/* Clear All Button */}
      {hasAnyFilters && (
        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCategories([]);
            clearAllAdvancedFilters();
          }}
          className="text-xs text-gray-600 hover:text-gray-800 underline self-center"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default ActiveFilter;

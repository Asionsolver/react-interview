// components/AdvancedFilterDropdown.jsx
import { useRef, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const AdvancedFilterDropdown = ({
  showFilterDropdown,
  setShowFilterDropdown,
  priceFilter,
  setPriceFilter,
  statusFilter,
  setStatusFilter,
  stockFilter,
  setStockFilter,
  statusOptions,
  onClearFilters,
}) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleStatus = (status) => {
    setStatusFilter((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const handlePriceTypeChange = (type) => {
    setPriceFilter((prev) => ({
      ...prev,
      type,
      min: type === "custom-range" ? prev.min : "",
      max: type === "custom-range" ? prev.max : "",
    }));
  };

  const handleStockTypeChange = (type) => {
    setStockFilter((prev) => ({
      ...prev,
      type,
      min: type === "custom-range" ? prev.min : "",
      max: type === "custom-range" ? prev.max : "",
    }));
  };

  const clearAllFilters = () => {
    setPriceFilter({ min: "", max: "", type: "none" });
    setStatusFilter([]);
    setStockFilter({ min: "", max: "", type: "none" });
    onClearFilters();
  };

  const hasActiveFilters =
    priceFilter.type !== "none" ||
    statusFilter.length > 0 ||
    stockFilter.type !== "none";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
      >
        <FaFilter className="text-gray-600" />
        <span>Filter</span>
        {hasActiveFilters && (
          <span className="bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            !
          </span>
        )}
      </button>

      {/* Filter Dropdown Menu */}
      {showFilterDropdown && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
          <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => setShowFilterDropdown(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Price Filter Section */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Price
              </h4>

              {/* Price Type Selection */}
              <div className="space-y-2 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="priceType"
                    checked={priceFilter.type === "none"}
                    onChange={() => handlePriceTypeChange("none")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">No Filter</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="priceType"
                    checked={priceFilter.type === "low-to-high"}
                    onChange={() => handlePriceTypeChange("low-to-high")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">Low to High</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="priceType"
                    checked={priceFilter.type === "high-to-low"}
                    onChange={() => handlePriceTypeChange("high-to-low")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">High to Low</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="priceType"
                    checked={priceFilter.type === "custom-range"}
                    onChange={() => handlePriceTypeChange("custom-range")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">Custom Range</span>
                </label>
              </div>

              {/* Custom Price Range Inputs */}
              {priceFilter.type === "custom-range" && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={priceFilter.min}
                      onChange={(e) =>
                        setPriceFilter((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      placeholder="1000"
                      value={priceFilter.max}
                      onChange={(e) =>
                        setPriceFilter((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status Filter Section */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Status
              </h4>
              <div className="space-y-2">
                {statusOptions.map((status) => (
                  <label key={status} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={statusFilter.includes(status)}
                      onChange={() => toggleStatus(status)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Filter Section */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Stock Quantity
              </h4>

              {/* Stock Type Selection */}
              <div className="space-y-2 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stockType"
                    checked={stockFilter.type === "none"}
                    onChange={() => handleStockTypeChange("none")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">No Filter</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stockType"
                    checked={stockFilter.type === "low-stock"}
                    onChange={() => handleStockTypeChange("low-stock")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">
                    Low Stock (&lt; 10)
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stockType"
                    checked={stockFilter.type === "out-of-stock"}
                    onChange={() => handleStockTypeChange("out-of-stock")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">
                    Out of Stock (0)
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stockType"
                    checked={stockFilter.type === "custom-range"}
                    onChange={() => handleStockTypeChange("custom-range")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">Custom Range</span>
                </label>
              </div>

              {/* Custom Stock Range Inputs */}
              {stockFilter.type === "custom-range" && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Min Stock
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={stockFilter.min}
                      onChange={(e) =>
                        setStockFilter((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Max Stock
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      value={stockFilter.max}
                      onChange={(e) =>
                        setStockFilter((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilterDropdown;

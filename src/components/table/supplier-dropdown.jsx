// components/SupplierDropdown.jsx
import { useRef, useEffect } from "react";
import { RiEqualizer2Line } from "react-icons/ri";

const SupplierDropdown = ({
  products,
  suppliers,
  selectedSuppliers,
  setSelectedSuppliers,
  showSupplierDropdown,
  setShowSupplierDropdown,
  setCurrentPage,
  clearAllSuppliers,
}) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSupplierDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSupplier = (supplier) => {
    setSelectedSuppliers((prev) => {
      if (prev.includes(supplier)) {
        // Remove supplier if already selected
        return prev.filter((s) => s !== supplier);
      } else {
        // Add supplier if not selected
        return [...prev, supplier];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const selectAllSuppliers = () => {
    setSelectedSuppliers(suppliers);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
          selectedSuppliers.length > 0
            ? "border-amber-500 bg-amber-50 text-amber-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setShowSupplierDropdown(!showSupplierDropdown)}
      >
        <RiEqualizer2Line className="rotate-90" />
        <span>Suppliers</span>
        {selectedSuppliers.length > 0 && (
          <span className="bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {selectedSuppliers.length}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {showSupplierDropdown && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="p-3">
            {/* Header with Select All/Clear All */}
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
              <div className="text-sm font-semibold text-gray-700">
                Select Suppliers
              </div>
              <div className="flex gap-1 items-center justify-center">
                <button
                  onClick={selectAllSuppliers}
                  className="text-xs text-gray-600 border border-gray-100 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-50"
                >
                  All
                </button>
              </div>
            </div>

            {/* Suppliers List */}
            <div className="max-h-60 overflow-y-auto">
              {suppliers.map((supplier) => (
                <label
                  key={supplier}
                  className="flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.includes(supplier)}
                    onChange={() => toggleSupplier(supplier)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <span
                    className={`flex-1 ${
                      selectedSuppliers.includes(supplier)
                        ? "text-amber-800 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {supplier}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {products.filter((p) => p.suppliers === supplier).length}
                  </span>
                </label>
              ))}
            </div>

            {/* Selected Count */}
            {selectedSuppliers.length > 0 && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {selectedSuppliers.length} supplier selected
                </div>
                <button
                  onClick={clearAllSuppliers}
                  className="text-xs text-gray-600 border border-gray-100 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierDropdown;

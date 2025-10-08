import ItemsPerPageDropdown from "./items-per-page-dropdown";

const Pagination = ({
  productsLength,
  currentPage,
  totalPages,
  handlePageChange,
  getPaginationNumbers,
  showingProductsLength,
  itemsPerPage,
  itemsPerPageOptions,
  onItemsPerPageChange,
  showDropdown,
  setShowDropdown,
}) => {
  return (
    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Showing results */}
          <div>
            Showing <span className="font-medium">{showingProductsLength}</span>{" "}
            of <span className="font-medium">{productsLength}</span> products
          </div>

          {/* Items per page dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative cursor-pointer">
              <ItemsPerPageDropdown
                itemsPerPage={itemsPerPage}
                setShowDropdown={setShowDropdown}
                showDropdown={showDropdown}
                itemsPerPageOptions={itemsPerPageOptions}
                handleItemsPerPageChange={onItemsPerPageChange}
              />
            </div>
          </div>
        </div>

        {/* Page navigation */}
        <div className="flex gap-2 mt-2 md:mt-0">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {getPaginationNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`${page}-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={`${page}-${index}`}
                onClick={() => handlePageChange(page)}
                className={`px-3.5 py-1 border rounded ${
                  currentPage === page
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-gray-300 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

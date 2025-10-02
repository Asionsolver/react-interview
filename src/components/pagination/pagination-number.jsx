const PaginationNumber = ({
  currentPage,
  totalPages,
  handlePageChange,
  getPaginationNumbers,
}) => {
  return (
    <div className="flex justify-center my-4 ">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md ${
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
          <span key={`${page}-${index}`} className="px-3 py-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={`${page}-${index}`}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 mx-1 rounded-md ${
              currentPage === page
                ? "bg-amber-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
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
        className={`px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationNumber;

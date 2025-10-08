import { FaSearch } from "react-icons/fa";

const NotProductFound = () => {
  return (
    <div className="text-center py-12">
      <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No products found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or filter to find what you're looking for.
      </p>
    </div>
  );
};

export default NotProductFound;

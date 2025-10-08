import { useState } from "react";

const delta = 2;
const PRODUCT_PER_PAGE = 10;
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { initialProducts } from "../../data/product";
import NotProductFound from "./not-product-found";
import Pagination from "./pagination";
import Table from "./table";
import { useMemo } from "react";
import CategoriesDropdown from "./categories-dropdown";
import ActiveFilter from "./active-filter";
import AdvancedFilterDropdown from "./advanced-filter-dropdown";

const ProductTable = () => {
  // Sample product data
  const [currentPage, setCurrentPage] = useState(1);
  const [products] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // New state for category filter
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // New state for items per page
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Items per page options
  const itemsPerPageOptions = [5, 10, 15, 20, 25, 30];
  // New states for advanced filters
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [priceFilter, setPriceFilter] = useState({
    min: "",
    max: "",
    type: "none", // 'none', 'low-to-high', 'high-to-low', 'custom-range'
  });
  const [statusFilter, setStatusFilter] = useState([]);
  const [stockFilter, setStockFilter] = useState({
    min: "",
    max: "",
    type: "none", // 'none', 'low-stock', 'out-of-stock', 'custom-range'
  });

  // Status options
  const statusOptions = ["Active", "Out of Stock", "Low Stock"];

  // Extract unique categories from products
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  // Filtering logic of the ProductTable component
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.suppliers.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Categories filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Status filter - FIXED
    if (statusFilter.length > 0) {
      filtered = filtered.filter((product) =>
        statusFilter.includes(product.status)
      );
    }

    // Stock filter - FIXED
    if (stockFilter.type !== "none") {
      filtered = filtered.filter((product) => {
        const stock = product.quantityInStock;

        switch (stockFilter.type) {
          case "low-stock":
            return stock > 0 && stock < 10;
          case "out-of-stock":
            return stock === 0;
          case "custom-range": {
            const min = stockFilter.min ? parseInt(stockFilter.min) : 0;
            const max = stockFilter.max ? parseInt(stockFilter.max) : Infinity;
            return stock >= min && stock <= max;
          }
          default:
            return true;
        }
      });
    }

    // Price filter - FIXED (custom range only, sorting will handle low-to-high/high-to-low)
    if (priceFilter.type === "custom-range") {
      filtered = filtered.filter((product) => {
        const price = product.price;
        const min = priceFilter.min ? parseFloat(priceFilter.min) : 0;
        const max = priceFilter.max ? parseFloat(priceFilter.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    return filtered;
  }, [
    products,
    searchTerm,
    selectedCategories,
    statusFilter,
    stockFilter,
    priceFilter,
  ]);

  // Sort functionality with price filter integration
  const sortedProducts = useMemo(() => {
    let productsToSort = [...filteredProducts];

    // Price-based sorting (when price filter is set to low-to-high or high-to-low)
    if (priceFilter.type === "low-to-high") {
      return productsToSort.sort((a, b) => a.price - b.price);
    } else if (priceFilter.type === "high-to-low") {
      return productsToSort.sort((a, b) => b.price - a.price);
    }

    // Other column sorting
    if (sortConfig.key) {
      return productsToSort.sort((a, b) => {
        // Handle different data types
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Convert to numbers if possible for numeric comparison
        if (!isNaN(aValue) && !isNaN(bValue)) {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }

        // Date comparison
        if (sortConfig.key === "createdAt") {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return productsToSort;
  }, [filteredProducts, sortConfig, priceFilter.type]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <FaCheckCircle className="text-green-500" />;
      case "Out of Stock":
        return <FaTimesCircle className="text-red-500" />;
      case "Low Stock":
        return <FaExclamationCircle className="text-yellow-500" />;
      default:
        return <FaExclamationCircle className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const totalProducts = filteredProducts.length;

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;

  const end = start + itemsPerPage;

  const getPaginationNumbers = () => {
    const pages = [];

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) {
      pages.push("...");
    }
    for (let i = left; i <= right; i++) {
      pages.push(i);
    }
    if (right < totalPages - 1) {
      pages.push("...");
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page changes
    setShowDropdown(false);
  };
  return (
    <div className="relative container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Product Management
        </h1>
        <p className="text-gray-600">Manage your products and inventory</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative flex-1 w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full md:w-auto">
            <AdvancedFilterDropdown
              showFilterDropdown={showFilterDropdown}
              setShowFilterDropdown={setShowFilterDropdown}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              statusOptions={statusOptions}
              onApplyFilters={() => setCurrentPage(1)}
              onClearFilters={() => setCurrentPage(1)}
            />

            <CategoriesDropdown
              products={products}
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              showCategoryDropdown={showCategoryDropdown}
              setShowCategoryDropdown={setShowCategoryDropdown}
              setCurrentPage={setCurrentPage}
              clearAllCategories={clearAllCategories}
            />
          </div>
        </div>

        {/* Active Filters */}
        <ActiveFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          clearAllCategories={clearAllCategories}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible">
        <div className="overflow-x-auto">
          {sortedProducts.length > 0 &&
            sortedProducts.slice(start, end).length > 0 && (
              <Table
                sortedProducts={sortedProducts.slice(start, end)}
                handleSort={handleSort}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
                formatDate={formatDate}
                formatPrice={formatPrice}
              />
            )}

          {sortedProducts.length === 0 && <NotProductFound />}
        </div>

        {/* Footer */}
        <Pagination
          productsLength={products.length}
          showingProductsLength={sortedProducts.slice(start, end).length}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          getPaginationNumbers={getPaginationNumbers}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onItemsPerPageChange={handleItemsPerPageChange}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
      </div>
    </div>
  );
};

export default ProductTable;

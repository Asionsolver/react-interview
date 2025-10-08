// Helper functions
export const getPriceFilterLabel = (priceFilter) => {
  switch (priceFilter.type) {
    case "low-to-high":
      return "Low to High";
    case "high-to-low":
      return "High to Low";
    case "custom-range":
      return `${priceFilter.min || "0"} - ${priceFilter.max || "∞"}`;
    default:
      return "";
  }
};

export const getStockFilterLabel = (stockFilter) => {
  switch (stockFilter.type) {
    case "low-stock":
      return "Low Stock (< 10)";
    case "out-of-stock":
      return "Out of Stock";
    case "custom-range": {
      const min = stockFilter.min || "0";
      const max = stockFilter.max || "∞";
      return `${min} - ${max}`;
    }
    default:
      return "";
  }
};

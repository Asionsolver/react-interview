import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "./product-card";
import { delta, productsPerPage } from "./constants";
import PaginationNumber from "./pagination-number";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=200");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const start = (currentPage - 1) * productsPerPage;

  const end = start + productsPerPage;

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
  return !products.length ? (
    <h1>No Product Found.</h1>
  ) : (
    <div>
      <div className="flex flex-wrap gap-4 w-full justify-center m-4">
        {products?.slice(start, end).map((product) => (
          <div key={product.id} className="mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <PaginationNumber
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        getPaginationNumbers={getPaginationNumbers}
      />
    </div>
  );
};

export default Pagination;

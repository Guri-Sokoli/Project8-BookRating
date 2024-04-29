import React from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalItems, itemsPerPage, medianSize }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const setPage = (page) => {
    setSearchParams({ page });
  };

  const paginationItems = () => {
    const pages = [];
    let leftSide = currentPage - medianSize;
    let rightSide = currentPage + medianSize;

    if (leftSide < 1) {
      rightSide += 1 - leftSide;
      leftSide = 1;
    }
    if (rightSide > totalPages) {
      leftSide -= rightSide - totalPages;
      rightSide = totalPages;
      if (leftSide < 1) leftSide = 1;
    }

    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    return pages;
  };
  return (
    <div className="flex flex-row justify-center items-center gap-2 mb-5">
      {currentPage > 1 && (
        <button onClick={() => setPage(currentPage - 1)}>Previous</button>
      )}
      {leftEllipsis(currentPage, medianSize) && <span>...</span>}
      {paginationItems().map((page) => (
        <button
          key={page}
          className="w-8 h-8 bg-[#59461B] text-white rounded "
          style={{ fontWeight: currentPage === page ? "bold" : "normal" }}
          onClick={() => setPage(page)}
        >
          {" "}
          {page}{" "}
        </button>
      ))}
      {rightEllips(currentPage, medianSize, totalPages) && <span>...</span>}

      {currentPage < totalPages && (
        <button onClick={() => setPage(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

const leftEllipsis = (currentPage, medianSize) => {
  return currentPage > 1 + medianSize;
};

const rightEllips = (currentPage, medianSize, totalPages) => {
  return currentPage < totalPages - medianSize;
};

export default Pagination;

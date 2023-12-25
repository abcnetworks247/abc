"use client"
import React, { useContext } from "react";
import { UseProductProvider } from "../../../contexts/ProductProvider";

const Pagination = () => {
  const { currentPage, totalPages, handlePageChange } = UseProductProvider()

 

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page} 
            onClick={() => handlePageChange(page)}
            style={{ fontWeight: currentPage === page ? "bold" : "normal" }}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;

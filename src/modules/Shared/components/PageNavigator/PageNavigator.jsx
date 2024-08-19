import React, { useState } from "react";

export default function PageNavigator({ arrayOfPages, getList }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    getList(pageNum, 4);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      getList(newPage, 4);
    }
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    getList(newPage, 4);
  };

  return (
    // <div className="container-fluid px-4 my-5 d-flex justify-content-center justify-content-md-end navigationContainer">
    //   <nav aria-label="Page navigation example">
    //     <ul className="pagination">
    //       <li
    //         className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
    //         onClick={handlePrevious}
    //       >
    //         <a className="page-link text-black">Previous</a>
    //       </li>
    //       {arrayOfPages.map((pgNum) => (
    //         <li
    //           key={pgNum}
    //           className={`page-item ${currentPage === pgNum ? "active" : ""}`}
    //           onClick={() => handlePageClick(pgNum)}
    //         >
    //           <a className="page-link text-black">{pgNum}</a>
    //         </li>
    //       ))}
    //       <li
    //         className={`page-item ${
    //           currentPage === arrayOfPages.length ? "disabled" : ""
    //         }`}
    //         onClick={handleNext}
    //       >
    //         <a className="page-link text-black">Next</a>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
    <div className="container-fluid px-4 my-5 d-flex justify-content-center justify-content-md-end">
      <nav aria-label="Page navigation example">
        <ul className="pagination flex-wrap justify-content-center justify-content-md-end">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePrevious}
          >
            <a className="page-link text-black">Previous</a>
          </li>
          {arrayOfPages.map((pgNum) => (
            <li
              key={pgNum}
              className={`page-item ${currentPage === pgNum ? "active" : ""}`}
              onClick={() => handlePageClick(pgNum)}
            >
              <a className="page-link text-black">{pgNum}</a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === arrayOfPages.length ? "disabled" : ""
            }`}
            onClick={handleNext}
          >
            <a className="page-link text-black">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

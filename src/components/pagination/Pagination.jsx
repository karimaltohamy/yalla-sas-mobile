import React from "react";
import "./pagination.scss";

const Pagination = ({ lastPage, page, setPage }) => {
  return (
    <div className="pagination">
      <div className="items">
        {Array.from({ length: lastPage }).map((_, index) => {
          return (
            <div
              key={index}
              className={`item ${page == index + 1 && "active"}`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;

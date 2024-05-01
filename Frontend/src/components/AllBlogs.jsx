import { useState } from "react";
import BlogList from "../components/BlogList";
import ReactPaginate from "react-paginate";
import "./modules.css";

const AllBlogs = ({ data, itemsPerPage }) => {
  const [itemsoffset, setItemsOffset] = useState(0);

  const endoffset = itemsoffset + itemsPerPage;
  const currentItems = data.slice(itemsoffset, endoffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = (selectedPage * itemsPerPage) % data.length;
    setItemsOffset(offset);
  };
  return (
    <>
      <BlogList data={currentItems} />
      <div className="paginate">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination-container"
          pageClassName="pagination-item"
          activeClassName="pagination-item--selected"
          previousClassName="pagination-previous"
          nextClassName="pagination-next"
        />
      </div>
    </>
  );
};

export default AllBlogs;

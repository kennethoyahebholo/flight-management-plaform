import React from 'react';

import ReactPaginate from 'react-paginate';
import { IPagination } from './Pagination.types';

import Next from '../../assets/svg_component/Next';
import Prev from '../../assets/svg_component/Previous';

import './Pagination.scss';

function Pagination({ count, setPage, pageSize, page }: IPagination) {
  const handlePageClick = (data: { selected: number }) => {
    const { selected } = data;
    setPage(selected + 1);
  };
  const totalPages = Math.ceil(count / pageSize);
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="pagination-comp">
      <div className="page-count">
        <span className="page-total">{`${count} results`}</span>
      </div>

      <ReactPaginate
        previousLabel={Prev({ disabled: prevDisabled })}
        nextLabel={Next({ disabled: nextDisabled })}
        breakLabel="..."
        breakClassName="break-me"
        pageCount={totalPages}
        marginPagesDisplayed={2}
        forcePage={page - 1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="each-page"
      />
    </div>
  );
}

export default Pagination;

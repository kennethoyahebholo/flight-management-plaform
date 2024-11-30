import React, { useState } from 'react';

import ReactPaginate from 'react-paginate';
import { components } from 'react-select';
import Next from '../../assets/svg_component/Next';
import Prev from '../../assets/svg_component/Previous';
// import DropdownInput from '../DropdownInput';

import './Pagination.scss';
import { IPagination } from './Pagination.types';

function Pagination({ count, setPage, pageSize, page, limitValue, setLimitValue }: IPagination) {
  const handlePageClick = (data: { selected: any }) => {
    const { selected } = data;
    setPage(selected + 1);
  };
  const totalPages = Math.ceil(count / pageSize);
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;
  const [pageRange, setPageRange] = useState(2);

  const adjustLimit = (total: any) => {
    if (total < 50) {
      return 10;
    }
    if (total < 100) {
      return 20;
    }
    return 30;
  };

  const getLimitDropdown = () => {
    const limitsArray: any = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= adjustLimit(totalPages); i++) {
      limitsArray.push({
        label: String(i),
        value: String(i)
      });
    }
    return limitsArray;
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomDropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          width="12" // Change width here
          height="12" // Change height here
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
        </svg>
      </components.DropdownIndicator>
    );
  };

  const handleChangeLimit = (data: any) => {
    setLimitValue(data?.target?.value);
  };

  return (
    <div className="pagination-comp">
      <div className="page-count">
        <span className="page-total">{`${count} results`}</span>
      </div>

      <div className="pagination-limit">
        {limitValue && (
          <>
            <span className="pagination-limit-label">Show</span>
            <div className="pagination-limit-dropdown">
              {/* <DropdownInput
                options={getLimitDropdown()}
                name="limit"
                value={limitValue}
                controlHeight="30px"
                controlPadding="0px"
                dropdownIndicatorPadding="0px 2px 0px 0px"
                onChange={handleChangeLimit}
                CustomDropdownIndicator={CustomDropdownIndicator}
                borderRadiusControl="4px"
                singleValueFontSize="12px"
              /> */}
            </div>
          </>
        )}
      </div>

      <ReactPaginate
        previousLabel={Prev({ disabled: prevDisabled })}
        nextLabel={Next({ disabled: nextDisabled })}
        breakLabel="..."
        breakClassName="break-me"
        pageCount={totalPages}
        marginPagesDisplayed={pageRange}
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

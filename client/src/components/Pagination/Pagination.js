import React, { useEffect } from 'react';
// import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  console.log(paginationRange)


  // If there are less than 2 times in pagination range we shall not render the component
  if ( paginationRange.length < 2) {
    return null;
  }


  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul>
      <li onClick={onPrevious}>
        left arrow
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li>...</li>;
        }
		
        // Render our Page Pills
        return (
          <li onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <li onClick={onNext}>
        right arrow
      </li>
    </ul>
  );
};

export default Pagination;
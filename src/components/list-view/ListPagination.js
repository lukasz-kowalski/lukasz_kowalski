import React from 'react';
import { Link } from 'react-router-dom';

const ListPagination = ({ isFirstPage, isLastPage, numCurrentPage ,paginationData, queryParam }) => (
   <nav aria-label="Data grid navigation">
    <ul className="pagination justify-content-end">
      <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
        <Link 
          to={`/characters/${numCurrentPage - 1}`} 
          className="page-link" 
          tabIndex={isFirstPage ? '-1' : '0'}
        >
          Previous
        </Link>
      </li>

      {paginationData.map(link => link)}

      <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
        <Link 
          to={`/characters/${numCurrentPage + 1}${queryParam}`} 
          className="page-link" 
          tabIndex={isLastPage ? '-1' : '0'}
        >
          Next
        </Link>
      </li>
    </ul>
  </nav>
);

export default ListPagination;

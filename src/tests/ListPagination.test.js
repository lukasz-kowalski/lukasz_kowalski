import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import ListPagination from '../components/ListView/ListPagination';

let wrapper;

const numCurrentPage = 1;
const i = 1;
const paginationData = [
  <li key={'nav-li' + i} className="page-item">
    <NavLink
      to={{ pathname: `/characters/${i}`, search: `_page=${i}`}}
      className={`page-link ${numCurrentPage === i ? 'active' : ''}`}
    >
      {i} <span className="sr-only">{numCurrentPage === i ? '(current)' : ''}</span>
    </NavLink>
  </li>
]

beforeEach(() => {
  wrapper = shallow(
  <ListPagination
    isFirstPage={true}
    isLastPage={false}
    numCurrentPage={numCurrentPage}
    paginationData={paginationData}
  />);
})

test('should successful render ListPagination', () => {
  expect(wrapper).toMatchSnapshot();
})

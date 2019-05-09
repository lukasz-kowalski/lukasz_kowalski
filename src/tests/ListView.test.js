import React from 'react';
import { shallow } from 'enzyme';
import ListView from '../components/ListView/ListView';

let wrapper;

const match = {
  params: {
    page: '1'
  }
};

const location = {
  pathname: '/characters/1'
};

const history = {
  push: jest.fn()
};

const characters = [
  {
    "id": 1,
    "name": "Luke Skywalker",
    "species": "Human",
    "gender": "male",
    "homeworld": "Tatooine"
  },
  {
    "id": 2,
    "name": "C-3PO",
    "species": "Droid",
    "gender": "n/a",
    "homeworld": "Tatooine"
  }
];

const headers = {
  get: jest.fn(() => `<http://localhost:3000/characters?_page=1>; rel="first", 
  <http://localhost:3000/characters?_page=1>; rel="prev", 
  <http://localhost:3000/characters?_page=3>; rel="next", 
  <http://localhost:3000/characters?_page=3>; rel="last"`)
};

const headers2 = {
  get: jest.fn(() => `<http://localhost:3000/characters?_page=1&q=luke>; rel="first", 
  <http://localhost:3000/characters?_page=1&q=luke>; rel="prev", 
  <http://localhost:3000/characters?_page=5&q=luke>; rel="next", 
  <http://localhost:3000/characters?_page=5&q=luke>; rel="last"`)
};

beforeEach(() => {
  fetch.mockResponse(JSON.stringify(characters));
  wrapper = shallow(
  <ListView 
    match={match}
    location={location}
    history={history}
  />);
  wrapper.setState({
    searchParam: '&q=luke',
    sortParam: '&_sort=name&_order=asc'
  });
})

test('should successful render ListView with no results message', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should successful render ListView with characters', () => {
  wrapper.setState({
    characters
  });
  expect(wrapper).toMatchSnapshot();
})

test('should return _page=1 string', () => {
  expect(wrapper.instance().getInitialQuery()).toBe('_page=1');
})

test('should return _page=1&q=luke string', () => {
  expect(wrapper.instance().setSearchToQuery()).toBe('_page=1&q=luke');
})

test('should return _page=1&q=luke&_sort=name&_order=asc string', () => {
  const query = '_page=1&q=luke&_sort=name&_order=asc'
  expect(wrapper.instance().setSortToQuery()).toBe(query);
})

test('should push history to /characters/1?_page=1 on first render', () => {
  wrapper.instance().setURL();
  expect(history.push.mock.calls[0][0]).toBe('/characters/1?_page=1');
})

test('should set characters state from api fetch', async () => {
  const mockedState = {
    characters,
    firstPage: '',
    lastPage: '',
    currentPage: '1',
    searchParam: '&q=luke',
    sortParam: '&_sort=name&_order=asc'
  };
  await wrapper.instance().fetchData();
  expect(wrapper.state()).toEqual(mockedState);
})

test('should parse header and return first and last page', () => {
  expect(wrapper.instance().parseHeaders(headers)).toEqual({ firstPage: '1', lastPage: '3' });
})

test('should parse header with query param and return first and last page', () => {
  expect(wrapper.instance().parseHeaders(headers2)).toEqual({ firstPage: '1', lastPage: '5' });
})

test('should change searchParam in component state to &q=luke', () => {
  const event = {
    target: {
      value: 'luke'
    }
  };
  wrapper.instance().handleQueryChange(event);
  expect(wrapper.state('searchParam')).toBe('&q=luke');
})

test('should change searchParam in component state to empty string when event has no value', () => {
  const event = {
    target: {
      value: ''
    }
  }
  wrapper.instance().handleQueryChange(event);
  expect(wrapper.state('searchParam')).toBe('');
})

test('should change sortParam in component state to &q=luke', () => {
  const name = 'species';
  const sortParam = '&_sort=species&_order=asc';
  wrapper.instance().handleSortChange(name);
  expect(wrapper.state('sortParam')).toBe(sortParam);
})

test('should change sortParam to empty string when no sort selected', () => {
  wrapper.instance().handleSortChange('');
  expect(wrapper.state('sortParam')).toBe('');
})

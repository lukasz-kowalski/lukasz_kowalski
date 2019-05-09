import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from '../components/ui/SearchInput';
import { wrap } from 'module';

let wrapper;

const handleChange = jest.fn();
const handleQueryChange = jest.fn();

beforeEach(() => {
  wrapper = shallow(
  <SearchInput
    id="searchInput"
    label="Search characters..."
    isValid={true}
    placeholder="Search characters..."
    handleQueryChange={handleQueryChange}
  />);
})

test('should successful render SearchInput', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should call handleQueryChange when calling handleChange', () => {
  const event = { target: { value: 'Test' } };
  wrapper.instance().handleChange(event);
  expect(handleQueryChange).toBeCalledWith(event);
})

test('should call handleQueryChange function on change', () => {
  const event = { target: { value: 'Test' } };
  wrapper.find('#searchInput').simulate('change', event);
  expect(handleQueryChange).toBeCalledWith(event);
})

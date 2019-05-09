import React from 'react';
import { shallow } from 'enzyme';
import ListSortButton from '../components/ListView/ListSortButton';

let wrapper;

const handleSortChange = jest.fn();

beforeEach(() => {
  wrapper = shallow(
  <ListSortButton
    name="Species"
    handleSortChange={handleSortChange}
  />);
})

test('should successful render ListSortButton', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should call handleSortChange when button click', () => {
  wrapper.find('.th-button').simulate('click');
  expect(handleSortChange).toBeCalled();
})

test('should call handleSortChange with name arg when button click', () => {
  const name = 'Species'.toLowerCase();
  wrapper.find('.th-button').simulate('click');
  expect(handleSortChange).toBeCalledWith(name);
})

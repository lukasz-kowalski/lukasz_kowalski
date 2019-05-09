import React from 'react';
import { shallow } from 'enzyme';
import { Select } from '../components/ui/Select';

let wrapper;

const options = [
  'Option1',
  'Option2',
  'Option3'
];

const handleChange = jest.fn();

beforeEach(() => {
  wrapper = shallow(
  <Select
    id="character-species"
    label="Choose character species"
    isValid={true}
    options={options}
    handleChange={handleChange}
  />);
})

test('should successful render Select', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should call handleChange function on change', () => {
  const event = { target: { value: 'Test' } };
  wrapper.find('#character-species').simulate('change', event);
  expect(handleChange).toBeCalledWith(event);
})

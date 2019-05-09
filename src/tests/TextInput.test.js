import React from 'react';
import { shallow } from 'enzyme';
import { TextInput } from '../components/ui/TextInput';

let wrapper;

const validate = jest.fn();
const handleChange = jest.fn();

beforeEach(() => {
  wrapper = shallow(
  <TextInput
    id="character-name"
    label="Character name"
    isValid={true}
    placeholder="Enter name"
    validate={validate}
    handleChange={handleChange}
  />);
})

test('should successful render TextInput', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should call validate function on input blur', () => {
  wrapper.find('#character-name').simulate('blur');
  expect(validate).toBeCalled();
})

test('should call handleChange function on change', () => {
  const event = { target: { value: 'Test' } };
  wrapper.find('#character-name').simulate('change', event);
  expect(handleChange).toBeCalledWith(event);
})

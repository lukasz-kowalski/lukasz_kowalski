import React from 'react';
import { shallow } from 'enzyme';
import { Radio } from '../components/ui/Radio';

let wrapper;

const handleChange = jest.fn();

const radioData = [
  {
    id: 'character-male',
    value: 'male',
    label: 'Male'
  },
  {
    id: 'character-female',
    value: 'female',
    label: 'Female'
  },
  {
    id: 'character-na',
    value: 'n/a',
    label: 'n/a'
  }
];

beforeEach(() => {
  wrapper = shallow(
  <Radio
    id="character-gender"
    radioData={radioData}
    handleChange={handleChange}
  />);
})

test('should successful render Radio', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should successful render TextInput', () => {
  const event = { target: { value: 'Test' } };
  wrapper.find('#character-male').simulate('change', event);
  expect(handleChange).toBeCalledWith(event);
})

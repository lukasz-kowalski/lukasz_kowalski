import React from 'react';
import { shallow } from 'enzyme';
import Radio from '../components/ui/Radio';

let wrapper;

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
  />);
})

test('should successful render Radio', () => {
  expect(wrapper).toMatchSnapshot();
})

import React from 'react';
import { shallow } from 'enzyme';
import Select from '../components/ui/Select';

let wrapper;

const options = [
  'Option1',
  'Option2',
  'Option3'
];

beforeEach(() => {
  wrapper = shallow(
  <Select
    id="character-species"
    label="Choose character species"
    isValid={true}
    options={options}
  />);
})

test('should successful render Select', () => {
  expect(wrapper).toMatchSnapshot();
})

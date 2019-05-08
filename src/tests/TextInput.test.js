import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../components/ui/TextInput';

let wrapper;

beforeEach(() => {
  wrapper = shallow(
  <TextInput
    id="character-name"
    label="Character name"
    isValid={true}
    placeholder="Enter name"
  />);
})

test('should successful render TextInput', () => {
  expect(wrapper).toMatchSnapshot();
})

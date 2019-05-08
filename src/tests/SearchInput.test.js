import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from '../components/ui/SearchInput';

let wrapper;

beforeEach(() => {
  wrapper = shallow(
  <SearchInput
    id="character-name"
    label="Character name"
    isValid={true}
    placeholder="Enter name"
  />);
})

test('should successful render SearchInput', () => {
  expect(wrapper).toMatchSnapshot();
})

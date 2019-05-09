import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../components/ListView/ListItem';

let wrapper;

const character = {
  name: 'Test',
  species: 'Martian',
  gender: 'female',
  homeworld: ''
}

beforeEach(() => {
  wrapper = shallow(
  <ListItem
    character={character}
  />);
})

test('should successful render ListItem', () => {
  expect(wrapper).toMatchSnapshot();
})

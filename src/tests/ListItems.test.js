import React from 'react';
import { shallow } from 'enzyme';
import ListItems from '../components/ListView/ListItems';

let wrapper;

const characters = [
  {
    "id": 1,
    "name": "Luke Skywalker",
    "species": "Human",
    "gender": "male",
    "homeworld": "Tatooine"
  },
  {
    "id": 2,
    "name": "C-3PO",
    "species": "Droid",
    "gender": "n/a",
    "homeworld": "Tatooine"
  }
];

beforeEach(() => {
  wrapper = shallow(
  <ListItems
    characters={characters}
  />);
})

test('should successful render ListItems', () => {
  expect(wrapper).toMatchSnapshot();
})

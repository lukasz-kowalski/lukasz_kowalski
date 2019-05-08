import React from 'react';
import { shallow } from 'enzyme';
import AddCharacter from '../components/AddCharacter/AddCharacter';

let wrapper;
const mockMath = Object.create(global.Math);
mockMath.random = () => 1;
global.Math = mockMath;

beforeEach(() => {
  const species = ['aliens', 'martians'];
  fetch.mockResponse(JSON.stringify(species));
  wrapper = shallow(
  <AddCharacter />);
})

test('should successful render AddCharacter', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should set character-name value to abc', () => {
  wrapper.instance().handleInputValue('character-name', 'abc');
  expect(wrapper.state().inputs['character-name'].value).toBe('abc');
})

test('should set response in species array', async () => {
  const species = ['aliens', 'martians'];
  await wrapper.instance().fetchSpecies();
  expect(wrapper.state('species')).toEqual(species);
})

test('should set isFormValid in state to false if any input is invalid', async () => {
  await wrapper.instance().validateForm('character-name', false);
  expect(wrapper.state('isFormValid')).toBe(false);
})

test('should set isFormValid in state to true if all inputs are valid', async () => {
  const inputs = ['character-name', 'character-species', 'character-gender'];
  await inputs.forEach(input => wrapper.instance().validateForm(input, true));
  expect(wrapper.state('isFormValid')).toBe(true);
})

test('should create expected payload', () => {
  const expectedPayload = {
    id: 10000,
    gender: 'male',
    homeworld: 'Mars',
    name: 'Last Man',
    species: 'martian'
  };
  const inputs = [
    { name: 'character-name', value: 'Last Man' },
    { name: 'character-species', value: 'martian' },
    { name: 'character-gender', value: 'male' },
    { name: 'character-homeland', value: 'Mars' }
  ];

  inputs.forEach(input => wrapper.instance().handleInputValue(input.name, input.value));
  expect(wrapper.instance().createPayload()).toEqual(expectedPayload);
})

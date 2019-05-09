import React from 'react';
import { shallow } from 'enzyme';
import CharactersForm from '../components/CharactersForm/CharactersForm';

let wrapper;
const mockMath = Object.create(global.Math);
mockMath.random = () => 1;
global.Math = mockMath;

beforeEach(() => {
  const location = {
    pathname: '/add-character/'
  };
  const species = ['aliens', 'martians'];
  fetch.mockResponse(JSON.stringify(species));
  wrapper = shallow(
  <CharactersForm location={location} />
  );
})

test('should successful render AddCharacter form', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should successful render EditCharacter form', () => {
  const location = {
    pathname: '/edit-character/123'
  };
  wrapper.setProps({
    location: location
  })
  expect(wrapper).toMatchSnapshot();
})

test('should set initial state from props', () => {
  const state = {
    species: [],
    doValidate: false,
    isFormValid: false,
    inputs: {
      'character-name': {
        value: 'Test',
        isValid: false
      },
      'character-species': {
        value: 'Martian',
        isValid: false
      },
      'character-gender': {
        value: 'n/a',
        isValid: false
      },
      'character-homeworld': {
        value: 'Mars',
        isValid: true
      }
    }
  };

  const propsState = {
    name: 'Test',
    species: 'Martian',
    gender: 'n/a',
    homeworld: 'Mars'
  };

  const location = {
    pathname: '/edit-character/123',
    state: propsState
  }

  const wrapper2 = shallow(
    <CharactersForm location={location} />
  );

  expect(wrapper2.state()).toEqual(state);
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
    { name: 'character-homeworld', value: 'Mars' }
  ];

  inputs.forEach(input => wrapper.instance().handleInputValue(input.name, input.value));
  expect(wrapper.instance().createPayload()).toEqual(expectedPayload);
})

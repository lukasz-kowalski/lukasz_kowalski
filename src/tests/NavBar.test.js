import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../components/nav-bar/NavBar';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<NavBar />);
})

test('should successful render NavBar', () => {
  expect(wrapper).toMatchSnapshot();
})

test('should change component state isOpen to true after first click on button', () => {
  wrapper.find('.navbar-toggler').simulate('click');
  expect(wrapper.state('isOpen')).toBe(true);
})

test('should change component state isOpen to false after second click on button', () => {
  wrapper.find('.navbar-toggler').simulate('click');
  wrapper.find('.navbar-toggler').simulate('click');
  expect(wrapper.state('isOpen')).toBe(false);
})

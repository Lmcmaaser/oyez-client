import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ZipCode from './ZipCode';

it('renders a .item by default', () => {
  const wrapper = shallow(<ZipCode />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<ZipCode />);
});

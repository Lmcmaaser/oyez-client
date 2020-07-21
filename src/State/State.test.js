import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import State from './State';

it('renders a .item by default', () => {
  const wrapper = shallow(<State />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<State />);
});

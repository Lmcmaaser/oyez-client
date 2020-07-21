import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Nav from './Nav';

it('renders a .Nav by default', () => {
  const wrapper = shallow(<Nav />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<Nav />);
});

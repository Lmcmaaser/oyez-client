import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Search from './Search';

it('renders a .instructions by default', () => {
  const wrapper = shallow(<Search />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<Search />);
});

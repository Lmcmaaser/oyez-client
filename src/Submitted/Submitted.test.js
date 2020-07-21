import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Submitted from './Submitted';

it('renders a .instructions by default', () => {
  const wrapper = shallow(<Submitted />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<Submitted />);
});

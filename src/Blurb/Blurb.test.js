import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Blurb from './Blurb';

it('renders a .instructions by default', () => {
  const wrapper = shallow(<Blurb />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders without crashing', () => {
  shallow(<Blurb />);
});

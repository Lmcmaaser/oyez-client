import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import All from './All'

it('renders a .item by default', () => {
  const wrapper = shallow(<All />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders without crashing', () => {
  shallow(<All />);
});

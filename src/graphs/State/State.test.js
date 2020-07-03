import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import State from './State'

it('renders a .state_graph by default', () => {
  const wrapper = shallow(<State />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders without crashing', () => {
  shallow(<State />);
});

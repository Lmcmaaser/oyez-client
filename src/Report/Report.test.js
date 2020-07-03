import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Report from './Report'

it('renders a .report-page by default', () => {
  const wrapper = shallow(<Report />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders without crashing', () => {
  shallow(<Report/>);
});

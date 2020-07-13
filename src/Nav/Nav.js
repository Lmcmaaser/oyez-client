import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../content';
import './Nav.css';
import { GrHome } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";

export default class Nav extends React.Component {
  render () {
    return (
      <Content className='Nav'>
        <Link to='/'>
          <GrHome />
        </Link>
        <Link to='/report'>
          <GrAddCircle />
        </Link>
        <Link to='/search'>
          <GrSearch />
        </Link>
      </Content>
    )
  }
}

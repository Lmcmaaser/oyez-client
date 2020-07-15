import React, { Component } from 'react';
import { GrGithub } from "react-icons/gr";
import { GrMailOption } from "react-icons/gr";
import { GrLinkedinOption } from "react-icons/gr";
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className='Footer'>
        <div className='contacts'>
          <a href="https://github.com/Lmcmaaser" target="_blank"><GrGithub /></a>
        </div>
        <div className='contacts'>
          <a href="mailto:lmcmaaser@gmail.com" target="_blank"><GrMailOption /></a>
        </div>
        <div className='contacts'>
          <a href="https://www.linkedin.com/in/laurenmaaser" target="_blank"><GrLinkedinOption /></a>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { GrGithub } from "react-icons/gr";
import { GrMailOption } from "react-icons/gr";
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className='Footer'>
        <p><a href="https://github.com/Lmcmaaser" target="_blank"><GrGithub /></a></p>
        <p><a href="" target="_blank"><GrMailOption /></a></p>
      </div>
    )
  }
}

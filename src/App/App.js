import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Blurb from '../Blurb/Blurb';
import Report from '../Report/Report';
import ShowAll from '../graphs/ShowAll/ShowAll';
import ShowState from '../graphs/ShowState/ShowState';
import ShowZipCode from '../graphs/ShowZipCode/ShowZipCode';
import ApiContext from '../ApiContext';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

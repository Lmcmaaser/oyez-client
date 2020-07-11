import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import  StateData from './state-data';
import './index.css';
import App from './App/App';


ReactDOM.render(
  <BrowserRouter>
    <App data={StateData}/>
  </BrowserRouter>,
  document.getElementById('root')
);

import React, { Component } from 'react';
import './Blurb.css';

export default class Blurb extends Component {
  render() {
    return (
      <div>
        <h3>How to Use Oyez!</h3>
        <div className="instructions">
          <p className="info">Oyez is designed to help you track the spread of COVID-19 in your local community.</p>
          <p className="info">
            It tracks COVID-19 cases by state and zipcode, giving you the tools to better protect you and your family when going out in public!
          </p>
          <p className="info">Add a report or track local cases by using the navigation bar.</p>
          <p className="info">* Data on Oyez is self-reported and may not reflect the actual data in the area.</p>
        </div>
      </div>
    )
  }
}

import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../content';
import { GrBarChart } from "react-icons/gr";
import { GrLineChart } from "react-icons/gr";
import { GrPieChart } from "react-icons/gr";

export default class Search extends React.Component {

  render () {

    return (
      <div>
        <div className="instructions">
          <Content className='Search'>
            <h3>Get Data!</h3>
            <p className="info">Select what data you would like to see:</p>
              <p className="info">View all reports submitted to Oyez by state:
                <Link to='/all'>
                  <GrBarChart />
                </Link>
              </p>
              <p className="info">View new reports over time by state:
                <Link to='/state'>
                  <GrLineChart />
                </Link>
              </p>
              <p className="info">View by zipcode:
                <Link to='/zipcode'>
                  <GrPieChart />
                </Link>
              </p>
          </Content>
        </div>
      </div>
    )
  }
}

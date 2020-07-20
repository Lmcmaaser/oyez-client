import React from 'react';
import './All.css';
import ApiContext from '../ApiContext';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class All extends React.Component {
  static contextType = ApiContext;
  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  render() {
    let dataPoints =  [];
    let selectedValues = [];
    let existingStates = this.context.us_states || [];
    let stateidValues = [];
    let stateValue = [];

    //array of objects, stateid and number or reports for each state
    if (this.context.reports) {
      this.context.reports.forEach(report => {
      let existingValue = selectedValues.find(value => value.stateid === parseInt(report.stateid));
        if (existingValue === undefined) {
          selectedValues.push({
            stateid: report.stateid,
            count: 1
          });
        } else {
        existingValue.count++;
      }
    });
  }

    // sorts stateid in ascending order
    let sortedValues = selectedValues.sort(this.compareValues('stateid', 'asc'));

    //returns an array of stateid objects (ex. {stateid: 3}) for use in getting state names
    for(let i = 0; i < selectedValues.length; i++) {
      stateidValues.push({
        stateid:selectedValues[i].stateid
      });
    }

    //finds state names based on report stateid
    for(let i = 0; i < existingStates.length; i++) {
      for(let j = 0; j < stateidValues.length; j++) {
        if (Number(existingStates[i].stateid) ===   Number(stateidValues[j].stateid)) {
          stateValue.push({
            label:existingStates[i].name
          })
        }
      }
    }

    //returns an array of count objects (ex. {count: 5})
    let countValues = [];
    for(let i = 0; i < sortedValues.length; i++) {
      countValues.push({
        y:sortedValues[i].count
      });
    }

    //merges label objects and y objects
    dataPoints = stateValue.map((label, i) => {
      return {
        ...label,
        ...countValues[i]
      }
    })

    const options = {
      animationEnabled: true,
			theme: "light2",
			title:{
				text: "Self-Reported Instances of COVID-19 by State"
			},
			axisX: {
				title: "States",
			},
			axisY: {
				title: "Total Number of Reports",
			},
      data: [
        {
          type: "bar",
          dataPoints: dataPoints
        }
      ]
    }
    return (
      <div className="item">
        <h3>
          All Reported Instances
        </h3>
        <div className='results_group'>
          <CanvasJSChart options = {options}
				    onRef={ref => this.chart = ref}
			    />
        </div>
      </div>
    )
  }
}

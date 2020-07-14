import React from 'react';
import './All.css';
import ApiContext from '../ApiContext';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class All extends React.Component {
  static contextType = ApiContext;
  render() {
    let dataPoints =  [];
    let selectedValues = [];
    let existingStates = this.context.us_states;
    let stateValue = [];
    console.log(existingStates)

    this.context.reports.forEach(report => {
      let existingValue = selectedValues.find(value => value.stateid === parseInt(report.stateid));
        if (existingValue === undefined) {
          selectedValues.push({
            stateid: report.stateid,
            // name: this.context.us_states.find(us_state => us_state.stateid === report.stateid).name,
            count: 1
          });
        } else {
        existingValue.count++;
      }
    });
    console.log(selectedValues); //array of objects, stateid and number or reports for each state
    let stateidValues = [];
    for(let i = 0; i < selectedValues.length; i++) {
      stateidValues.push({
        stateid:selectedValues[i].stateid
      });
    }
    console.log(stateidValues); //returns an array of stateid objects (ex. {stateid: 3})

    for(let i = 0; i < existingStates.length; i++) {
      for(let j = 0; j < stateidValues.length; j++) {
        // console.log("vals: ", this.context.us_states[i], stateidValues[j]);
        if (Number(existingStates[i].stateid) ===   Number(stateidValues[j].stateid)) {
          stateValue.push(existingStates[i])
        }
      }
    }
    console.log(stateValue);

    for (let i = 0; i < selectedValues.length; i++) {
      dataPoints.push({
        label: selectedValues[i].name, // undefined
        y: selectedValues[i].count
      });
    }
    console.log(dataPoints); //has report count

    const options = {
      animationEnabled: true,
			theme: "light2",
			title:{
				text: "Self-reported Instances of COVID-19 by State"
			},
			axisX: {
				title: "States",
			},
			axisY: {
				title: "Number of reports",
			},
      data: [
        {
          type: "bar",
          dataPoints: dataPoints
        }
      ]
    }
    return (
      <div>
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

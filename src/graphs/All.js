import React from 'react';
import ApiContext from '../ApiContext';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
import './All.css';

//let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ShowAll extends React.Component {
  static contextType = ApiContext;
  render() {
    let dataPoints =  [];
    let selectedValues = [];
    this.context.reports.forEach(report => {
      let existingValue = selectedValues.find(value => value.stateid === report.stateid);
        if (existingValue === undefined) {
          selectedValues.push({
            stateid: report.stateid,
            name: this.context.us_states.find(us_state => us_state.stateid === report.stateid).name,
            count: 1
          });
        } else {
        existingValue.count++;
      }
    });
    console.log(selectedValues); //array of objects

    for (let i = 0; i < selectedValues.length; i++) {
      dataPoints.push({
        label: selectedValues[i].name,
        y: selectedValues[i].count
      });
    }
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

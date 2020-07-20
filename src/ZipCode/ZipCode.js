import './ZipCode.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../content';
import { GrAddCircle } from "react-icons/gr";
import ApiContext from '../ApiContext';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


//user selects a zipcode, graph displays the diagnosis_type and date for all reports with that zipcode
export default class ZipCode extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props)
    this.state = {
      code: {
        value: '',
        touched: false
      },
      issubmitted: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const zip = {
      value: event.target.code.value,
      touched: true
    }
    this.setState({
      code: zip,
      issubmitted: true
    });
    console.log(zip); // shows {code: "85308"} value is a string
    console.log(this.state.code); //shows zip code number only, value is int
  }

  getFilteredReports = (reports) => {
    return reports.filter((report) => {
      if ((parseInt(!this.state.code.value) || parseInt(this.state.code.value) === report.code)) {
        return true;
      } else {
        return false;
      }
    });
  }

  render() {

    let dataPoints =  [];
    let existingValues = this.context.reports || [];
    let selfCount = 0;
    let testCount = 0;
    let doctorCount = 0;
    let filteredReports = this.getFilteredReports(existingValues)

    let labelTest = {label: "test"};
    let labelDoc = {label: "doctor"};
    let labelSelf = {label: "self"};
    let testPoints = {};
    let doctorPoints = {};
    let selfPoints = {};
    let count = 0;
    //count how many reports total for zip code
    for (let i = 0; i < filteredReports.length; i++) {
      count++
    }

    // count how many reports for each diagnosis type
    for (let i = 0; i < filteredReports.length; i++) {
      if (filteredReports[i].diagnosis_type === 'test') {
        testCount++
      } else if (filteredReports[i].diagnosis_type === 'doctor') {
        doctorCount++
      } else if (filteredReports[i].diagnosis_type === 'self') {
        selfCount++
      }
    }

    // translate diagnosis_type counts to percentages
    let testNumber = {y: (testCount/count*100).toFixed(2)};
    let selfNumber = {y: (selfCount/count*100).toFixed(2)};
    let doctorNumber = {y: (doctorCount/count*100).toFixed(2)};

    //combine x and y axis into 1 object {label: '', y: ''}
    testPoints = Object.assign(labelTest, testNumber);
    doctorPoints = Object.assign(labelDoc, doctorNumber);
    selfPoints = Object.assign(labelSelf, selfNumber);

    // add desired objects to dataPoints array
    dataPoints.push(testPoints, doctorPoints, selfPoints);

    //place rendering of graph in an if else statement if touched is true, display graph
    const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Diagnosis Type Breakdown"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: dataPoints
			}]
		}
    let issubmitted = this.state.issubmitted;

    return (
      <div className="item">
      <form className="form-group" onSubmit={event => this.handleSubmit(event)}>
        <fieldset>
          <legend>Report Form</legend>
            <div className="display">
              <label className="main-label" htmlFor="code">Input a Zip Code*</label>
              <input
                type="text"
                name="code"
                id="code"
                aria-label="input zip code"
                required
              />
              <button
                type="submit"
                className="submit-button"
                aria-label="submit-button"
              >
                Submit
              </button>
            </div>
        </fieldset>
      </form>
        <div className="results_group">
          <div className="canvas">
            {
            filteredReports.length === 0 && this.state.code.touched ?
              <div>No reports have been subbmitted for that zipcode. Would you like to submit a report?
                <Content className='submitReport'>
                  <Link to='/report'>
                    <GrAddCircle />
                  </Link>
                </Content>
              </div>:
            issubmitted ?
            <CanvasJSChart options = {options}
              onRef={ref => this.chart = ref}
            />
            : <></>}
          </div>
        </div>
      </div>
    )
  }
}

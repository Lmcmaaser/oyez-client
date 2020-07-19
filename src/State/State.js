import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../content';
import { GrAddCircle } from "react-icons/gr";
import ApiContext from '../ApiContext';
import './State.css';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class State extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props)
    this.state = {
      stateid: {
        value: '',
        touched: false
      },
      issubmitted: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const us_state = {
      value: event.target.stateid.value,
      touched: true
    }
    this.setState({
      stateid: us_state,
      issubmitted: true
    });
  }

  //selects reports by state
  getFilteredReports = (reports) => {
    return reports.filter((report) => {
        if ((parseInt(!this.state.stateid.value) || parseInt(this.state.stateid.value) === report.stateid)) {
          return true;
        } else {
          return false;
        }
    });
  }

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

  //counts duplicate dates
  duplicateDates = (arr) => {
    const dups = {}
    arr.forEach(date => {
      if(Object.keys(dups).includes(date.label)) {
        dups[date.label]++
      } else {
        dups[date.label] = 1
      }
    })
    return dups
  }

  render() {
    //date & number of reports data for selected state
    let dataPoints =  [];
    let selectedValues = [];
    let existingValues = this.context.reports;

    // shows all reports for specified state
    let filteredReports = this.getFilteredReports(existingValues);

    // returns date values, includes duplicate dates
    for (let i = 0; i < filteredReports.length; i++) {
      selectedValues.push({
        label: filteredReports[i].diagnosis_date
      })
    }

    //sorts dates
    let sortedValues = selectedValues.sort(this.compareValues('label', 'asc'));

    //removes duplicate date values
    let jsonObject = sortedValues.map(JSON.stringify);
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    for (let i =0; i< uniqueArray.length; i++) {
      let d = new Date (uniqueArray[i].label);
      uniqueArray[i].label = d.toDateString();
    }

    // counts date occurences
    let dateOccurences = this.duplicateDates(sortedValues);

    // retrieves count values and formats for graph
    let dateCount = Object.values(dateOccurences);
    let yObj = [];
    for (let i = 0; i < dateCount.length; i++) {
      yObj.push({
        y: dateCount[i]
      });
    }


    //merges label objects and y objects
    dataPoints = uniqueArray.map((label, i) => {
      return {
        ...label,
        ...yObj[i]
      }
    })

    const options = {
			theme: "light2",
			title: {
				text: "Number of New Reports Over Time"
			},
			axisY: {
				title: "Number of Reports",
				includeZero: true
			},
			data: [{
				type: "line",
				xValueFormatString: "0000-00-00",
				y: "",
				dataPoints: dataPoints
			}]
		}

    let issubmitted = this.state.issubmitted;
    return (
      <div className="item">
        <form className="form-group" onSubmit={event => this.handleSubmit(event)}>
          <fieldset>
            <legend>Select state</legend>
              <div className="display">
                <label className="main-label" htmlFor="stateid">Select a State*</label>
                <select
                  name="stateid"
                  required
                  aria-label="select state"
                >
                  {this.context.us_states.map(us_state =>
                    <option key={us_state.stateid} value={us_state.stateid}>{us_state.name}</option>
                  )}
                </select>
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
        <div>* All dates displayed in UTC</div>
        <div className="results_group">
          <div className="canvas">
            {
            filteredReports.length === 0 && this.state.stateid.touched ?
              <div>No reports have been subbmitted for that state. Would you like to submit a report?
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

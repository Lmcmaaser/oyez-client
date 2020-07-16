import React from 'react';
import ValidationError from '../ValidationError.js';
import ApiContext from '../ApiContext';
import './Report.css';

export default class Report extends React.Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props)
    this.state = {
      stateid: {
        value: '',
        touched: true
      },
      code: {
        value: '',
        touched: false
      },
      diagnosis_type: {
        value: '',
        touched: false
      },
      diagnosis_date: {
        value: '',
        touched: false
      },
      household: {
        value: '',
        touched: false
      }
    }
  }

  updateStateId(stateid) {
    console.log(stateid);
    this.setState({stateid: {value: stateid, touched: true}});
  }
  updateZipCode(code) {
    console.log(code);
    this.setState({code: {value: code, touched: true}});
  }
  updateDiagnosisType(diagnosis_type) {
    console.log(diagnosis_type);
    this.setState({diagnosis_type: {value: diagnosis_type, touched: true}});
  }
  updateDiagnosisDate(diagnosis_date) {
    console.log(diagnosis_date);
    this.setState({diagnosis_date: {value: diagnosis_date, touched: true}});
  }
  updateHousehold(household) {
    this.setState({household: {value: household, touched: true}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { code, diagnosis_type, diagnosis_date, household, stateid } = this.state;
    const report = {
      code: code.value,
      diagnosis_type: diagnosis_type.value,
      diagnosis_date: diagnosis_date.value,
      household: household.value,
      stateid: stateid.value
    }
    console.log(report);
    this.context.addReport(report);
    this.props.history.push('/submitted');
  }

  validateZipCode() {
    const zip_code = this.state.code.value.trim();
    if (zip_code.length > 5) {
      return "Zip code can only be 5 digits long"
    } else if (!zip_code.match(/[0-9]/)) {
      return "Zip code may only contain numbers"
    }
  }
  validateHousehold() {
    const household = this.state.household.value.trim();
    if (!household.match(/[0-9]/)) {
      return "Your response may only contain a numbers"
    }
  }

  render() {
    const zipCodeError = this.validateZipCode();
    const householdError = this.validateHousehold();

    return (
      <div className="report-page">
        <h3>Submit a Report</h3>
        <form className="form-group" onSubmit={event => this.handleSubmit(event)}>
          <fieldset>
            <legend>Report Form</legend>
              <label className="main-label" htmlFor="stateid">What state do you live in?</label>
              <select
                name="stateid"
                required
                aria-label="select state"
                onChange={event => this.updateStateId(event.target.value)}
              >
                {this.context.us_states.map(us_state =>
                  <option key={us_state.stateid} value={us_state.stateid}>{us_state.name}</option>
                )}
              </select>
              <label className="main-label">What is your zip code?</label>
                <input
                  type="text"
                  required
                  name="code"
                  id="code"
                  aria-label="input zip code"
                  value={this.state.code.value}
                  onChange={event => this.updateZipCode(event.target.value)}
                />
                  {this.state.code.touched && (
                    <ValidationError message={zipCodeError} />
                  )}
              <label className="main-label" htmlFor="diagnosis_type">
                How were you diagnosed?
              </label>
                <label htmlFor="container">
                  <input
                    type="radio"
                    id="test"
                    name="diagnosis_type"
                    value="test"
                    aria-label="select test diagnosis type"
                    onChange={event => this.updateDiagnosisType(event.target.value)}
                  />
                  <span className="checkmark"></span>
                 Tested positive</label>
                <label htmlFor="container">
                  <input
                    type="radio"
                    id="doctor"
                    name="diagnosis_type"
                    value="doctor"
                    aria-label="select doctor diagnosis type"
                    onChange={event => this.updateDiagnosisType(event.target.value)}
                  />
                  <span className="checkmark"></span>
                Doctor's professional assessment (diagnosis made without a test)</label>
                <label htmlFor="container">
                  <input
                    type="radio"
                    id="self"
                    name="diagnosis_type"
                    value="self"
                    aria-label="select self diagnosis type"
                    onChange={event => this.updateDiagnosisType(event.target.value)}
                  />
                  <span className="checkmark"></span>
                Self-diagnosis based on my symptoms</label>
              <label className="main-label">When were you diagnosed? </label>
                <input
                  type="date"
                  required
                  name="diagnosis_date"
                  id="diagnosis_date"
                  aria-label="date of diagnosis"
                  value={this.state.diagnosis_date.value}
                  onChange={event => this.updateDiagnosisDate(event.target.value)}
                />
              <label className="main-label">
                How many people live with you in your household?
              </label>
                <input
                  type="text"
                  required
                  name="household"
                  id="household"
                  aria-label="number people in your hosuehold"
                  value={this.state.household.value}
                  onChange={event => this.updateHousehold(event.target.value)}
                />
                  {this.state.household.touched && (
                    <ValidationError message={householdError} />
                  )}

              <button
                type="submit"
                className="submit-button"
                aria-label="submit-button"
                disabled={
                this.validateZipCode() ||
                this.validateHousehold()
                }
              >
                Submit
              </button>
          </fieldset>
        </form>
      </div>
    )
  }
}

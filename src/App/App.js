import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Blurb from '../Blurb/Blurb';
import Report from '../Report/Report';
import ShowAll from '../graphs/All/All';
import ShowState from '../graphs/State/State';
import ShowZipCode from '../graphs/ZipCode/ZipCode';
import ApiContext from '../ApiContext';
import Footer from '../Footer/Footer';
import './App.css';

export defualt class App extends Componenet {
  constructor(props) {
    super(props)
    this.state = {
      reports: [],
      us_states: []
    }
  }

  handleAddReport = report => {
    fetch(`${config.API_ENDPOINT}pets`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_TOKEN}`
      },
      body: JSON.stringify(report)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        return res.json()
      })
      .then((res) => {
        this.getAllData(res);
      })
      .catch(error => {
        console.error({error});
      })
  }

  getAllData() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}reports`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_TOKEN}`
        }
      }),
      fetch(`${config.API_ENDPOINT}us_states`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_TOKEN}`
        }
      })
    ])
      .then(([reportsRes, us_statesRes]) => {
        if (!reportsRes.ok)
          return reportsRes.json().then(e => Promise.reject(e));
        if (!us_statesRes.ok)
          return us_statesRes.json().then(e => Promise.reject(e));
        return Promise.all([reportsRes.json(), us_statesRes.json()])
      })
      .then(([reports, us_states]) => {
        this.setState({reports. us_states});
      })
      .catch(error => {
        console.error({error});
      })
  }

  componentDidMount() {
    this.getAllData();
  }
  render() {
    const contextValue = {
      us_states: this.state.us_states,
      reports: this.state.reports,
      addReport: this.handleAddReport
    }
    return (
      <ApiContext.Provider value={contextValue}>
        <div className="App">
          <header className="App-header" role="banner">
            <h1>Oyez!</h1>
          </header>
          <nav>
            <Nav />
          </nav>
          <main className="main_content" role="main">
            <Route exact path='/' component={Blurb}/>
              <Route path='/report' component={Report} />
              <Route path='/all' component={ShowAll} />
              <Route path='/state' component={ShowState} />
              <Route path='/zipcode' component={ShowZipCode} />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </ApiContext.Provider>
    );
  }
}

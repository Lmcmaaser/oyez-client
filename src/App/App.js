import config from '../config';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Blurb from '../Blurb/Blurb';
import Report from '../Report/Report';
import Submitted from '../Submitted/Submitted'
import Search from '../Search/Search'
import All from '../All/All';
import State from '../State/State';
import ZipCode from '../ZipCode/ZipCode';
import ApiContext from '../ApiContext';
import Footer from '../Footer/Footer';
import './App.css';

export default class App extends Component {
   static defaultProps = {
    data: {
      us_states: []
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      reports: [],
      us_states: this.props.data.us_states,
    }
  }

  handleAddReport = report => {
    fetch(`${config.API_ENDPOINT}/reports`, {
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
      fetch(`${config.API_ENDPOINT}/reports`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${config.API_TOKEN}`
        }
      })
    ])
      .then(([reportsRes]) => {
        if (!reportsRes.ok)
          return reportsRes.json().then(e => Promise.reject(e));
        return Promise.all([reportsRes.json()])
      })
      .then(([reports]) => {
        this.setState({reports});
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
    console.log(this.state.reports);
    console.log(this.state.us_states);
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
              <Route path='/submitted' component={Submitted} />
              <Route path='/search' component={Search} />
              <Route path='/all' component={All} />
              <Route path='/state' component={State} />
              <Route path='/zipcode' component={ZipCode} />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </ApiContext.Provider>
    );
  }
}

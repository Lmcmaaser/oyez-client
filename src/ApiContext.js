import React from 'react';

const ApiContext = React.createContext({
  reports: [],
  us_states: [],
  addReport: () => {}
});

export default ApiContext;

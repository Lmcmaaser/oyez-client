import React from 'react';

const ApiContext = React.createContext({
  reports: [],
  usstates: [],
  addReport: () => {}
});

export default ApiContext;

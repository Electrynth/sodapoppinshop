import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';

const TRACKING_ID = "UA-96951707-5";
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-notifications-component/dist/theme.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



import React, { Component } from 'react';
import CSVAnalyzer from './CSVAnalyzer.js';
 
class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1>CSV Analyzer</h1>
        <CSVAnalyzer></CSVAnalyzer>
      </div>
    );
  }
}

export default App;

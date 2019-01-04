import React, { Component } from 'react';
import NavBar from './NavBar.js';
import CSVAnalyzer from './CSVAnalyzer.js';
 
class App extends Component {
  render() {
    return (
      <div className="App container">
        <NavBar />
        <CSVAnalyzer></CSVAnalyzer>
      </div>
    );
  }
}

export default App;

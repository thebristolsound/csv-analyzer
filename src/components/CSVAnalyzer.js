import React, { Component } from 'react';
import PapaParse from 'papaparse';

class CSVAnalyzer extends Component {

  constructor(props) { 
    // Call super class
    super(props); 

    this.state = {
      csvSet: new Set()
    }

    // Bind functions
    this.onFileLoaded = this.onFileLoaded.bind(this);
    this.findDuplicates = this.findDuplicates.bind(this);
  }

  handleFileChange = e => {
    let reader = new FileReader();
    const filename = e.target.files[0].name;
    const parserOptions = {
      delimiter: ",",
      header: true
    }

    reader.onload = event => {
      const csvData = PapaParse.parse(
        event.target.result,
        parserOptions
      );
      this.onFileLoaded(csvData.data, filename);
    }
    reader.readAsText(e.target.files[0]);
  }

  findDuplicates = (data) => {
    let duplicates = [];

    duplicates = data.map((el, index, array) => {

    });
  }

  // Callback
  onFileLoaded = (data, filename) => {
    console.log(filename + ' successfully loaded');
    this.findDuplicates(data);
  }


  render () {
    return (
      <div className="csv-analyzer">
        <label htmlFor="csvFileInput">Select a CSV</label>
        <input
          className="css-file-input"
          type="file"
          id="csvFileInput"
          accept=".csv, text/csv"
          onChange={e => this.handleFileChange(e)}
        />
      </div>
    )
  }
}

export default CSVAnalyzer;
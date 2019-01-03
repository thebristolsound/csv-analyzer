import React, { Component } from 'react';
import PapaParse from 'papaparse';
const levenshtein = require('fast-levenshtein');


class CSVAnalyzer extends Component {

  constructor(props) { 
    super(props); 

    this.state = {
      
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
    let seen = {};
    let dupes = [];

    // Sort data alphabetically (using first_name)
    data.sort((a, b) => a.first_name.localeCompare(b.first_name));

    // Use 'reduce' to generate unique key using first and last name.
    // Entries sharing the same key will be grouped together, allowing
    // us to find the easy duplicates.
    let groupedData = data.reduce((res, val) => {
      let key = val.first_name + '-' + val.last_name;
      res[key] = res[key] || [];
      res[key].push(val);
      return res;
    },{});

    // Make a second pass iterating through the keys to catch potential
    // outlier dupes (typos, etc) using the Levenshtein distance algorithm
    Object.keys(groupedData).forEach((key, index, arr) => {
      
    });

    console.log(groupedData);

   

    //console.log(groupedData);

    //console.log(levenshtein.get('Jacqueline-Ilchenko', 'Jacquelyn-Ilchenko'))

    /*
    var result = Object.values(data.reduce((, row) => {
      let key = row['first_name'] + '-' + row['last_name'];
      entries[key] = entries[key] || [];
      entries[key].push(row);
      return entries;
    },)).reduce((c, v) => { 
      console.log(v)
      return v.length > 1 ? c.concat(v) : c;
    }, []);


*/

    //console.log(result);
    console.log(dupes);

    

    
    
    //.reduce((c, v) => v.length > 0 ? c.concat(v) : c, []);

    //console.log(data);
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
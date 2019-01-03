import React, { Component } from 'react';
import PapaParse from 'papaparse';
import { uniqWith } from 'lodash';

// Levenshtein implementation from https://github.com/hiddentao/fast-levenshtein#readme
const levenshtein = require('fast-levenshtein');

/**
 * Simple component for taking in and processing a CSV
 */
class CSVAnalyzer extends Component {
  constructor(props) { 
    super(props); 

    this.state = {
      fileProcessed: false,
      rowCount: 0,
      dupeCount: null,
      uniqueCount: null,
      messaging: 'Select a File'
    }

    this.data = [];
    this.dataMap = [];
    this.uniques = [];
    this.duplicates = [];

    // Bind functions
    this.onFileLoaded = this.onFileLoaded.bind(this);
    this.findDuplicates = this.findDuplicates.bind(this);
    this.isUnique = this.isUnique.bind(this);
  }
  
  /**
   * Handle a CSV upload 
   * @param {Object} FileList 
   */
  handleFileChange(input) {

    // Instantiate a FileReader to load our CSV file into
    let reader = new FileReader();
    const filename = input.target.files[0].name;

    // PapaParse-specific config
    const parserOptions = {
      delimiter: ",",
      header: true
    }

    // Handle the onload event for our reader and pass
    // the payload off to our callback
    reader.onload = event => {
      const csvData = PapaParse.parse(
        event.target.result,
        parserOptions
      );
      this.onFileLoaded(csvData.data, filename);
    }

    // Start streaming our file
    reader.readAsText(input.target.files[0]);
  }

  // Callback for CSV upload
  onFileLoaded(data, filename) {
    console.log('Successfully loaded ' + filename);
    this.setState({
      messaging: 'Successfully processed ' + data.length + ' rows',
      fileProcessed: true,
      rowCount: data.length
    });
    this.data = data;
    this.findDuplicates(this.data);
  }


  /**
   * Find duplicate and unique values within a given data set
   * @param {Object[]} data
   * @public
   */
  findDuplicates(data){

    /**
     * Create a new collection on this class, adding an additional 
     * for 'key' property generated from the 'first_name' and 'last_name'
     * fields. This key will be used when determining uniquity below
    */
    this.dataMap = data.map((val) => {
      let key = val['first_name'] + '-' + val['last_name'];
      val['key'] = key;
      return val;
    });

    // Sort data alphabetically off key value
    this.dataMap.sort((a, b) => a['key'].localeCompare(b['key']));
    
    /** 
     * Find the unique objects in the collection, see class method
     * isUnique for implementation details. Note: Using lodash's 'uniqWith'
     * function to simplify object property comparison. 
     */
    this.uniques = uniqWith(this.dataMap, this.isUnique);

    /** 
     * Find the duplicates by finding the difference between our
     * original data collection and our uniques
     */
    this.duplicates = this.dataMap.filter((val) => {
      return !this.uniques.includes(val);
    });

    this.setState({
      uniqueCount: this.uniques.length,
      dupeCount: this.duplicates.length
    });

    this.printResults();
  }

  /** 
   * Comparator used in determining uniquity between two
   * keys on separate objects.  It uses the levenshtein distance
   * algorithm to allow for detection of edge case duplicates (typos, etc)
   * @param {Object} a
   * @param {Object} b
   * @public
  */
  isUnique(a, b){
    let dist = levenshtein.get(a['key'], b['key']);
    return (dist >= 0 && dist <= 3);
  }

  /** 
   * Print results to console
   * 
   */
  printResults() {
    console.log('Potential Duplicates: (' + this.duplicates.length + ')');
    console.log('..........');
    this.duplicates.forEach(val => console.log(JSON.stringify(val)));
    console.log('');
    console.log('Non Duplicates: (' + this.uniques.length + ')');
    console.log('..........');
    this.uniques.forEach(val => console.log(JSON.stringify(val)));
  }


  // Render function
  render () {
    return (
      <div className="container">
          <div className="csv-analyzer">
            <form>
              <div className="form-group">
                <label htmlFor="csvFileInput">File Upload</label>
                <input
                  className="form-control-file"
                  type="file"
                  id="csvFileInput"
                  accept=".csv, text/csv"
                  onChange={e => this.handleFileChange(e)}
                />
                <small id="fileHelpBlock" className="form-text text-muted">Please select a CSV (comma-separated value, .csv) to begin.</small>
              </div>
              {this.state.fileProcessed &&
                <div className="alert alert-secondary" role="alert">
                  {this.state.messaging}. Open the developer console to see the output.
                </div>
              }
              {this.state.dupeCount &&
                <div className="alert alert-primary" role="alert">
                I found {this.state.dupeCount} potential duplicate rows.
              </div>
              }
              {this.state.uniqueCount &&
                <div className="alert alert-success" role="alert">
                I found {this.state.uniqueCount} unique rows.
              </div>
              }
            </form>
          </div>
      </div>
    )
  }
}

export default CSVAnalyzer;
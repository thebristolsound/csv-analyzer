#CSV Analyzer Demo

## Usage
This project was built using Yarn as a package manager, it can be installed globally using Homebrew. 
```
brew install yarn
```
Clone or download the repo to your local machine

```
git clone https://github.com/mattddonovan/csv-analyzer.git && cd csv-analyzer
```

Install dependencies with `yarn`
```
yarn install
```

See below for more script options.


## Some notes
This is a very rough proof of concept single page application that attempts to take a comma-separated value (.csv) file
consisting of user data / contact information. The only required fields right now are `first_name` and `last_name` as they're 
used to generate dynamic keys for sorting and comparison. Upon uploading a file, it automatically parses each row in the `normal.csv`
test file and identifies exact duplicates as well as fuzzy matched duplicates using the Levenshtein Distance (LD) algorithm.

The output of the analysis is displayed in the developer console, and the UI reacts with basic feedback about the state of the application.  The code itself, specifically the `CSVAnalyzer` component is filled with comments explaining what's going on, so definitely take a look.

There are a few known issues / todos:
* The app is able to properly identify the duplicate values within a given dataset and remove them from the result set into a separate bucket. The console output correctly reflects this, but instead of outputting the potential duplicates in pairs (as asked in the assignment), it reports the duplicated rows that were omitted from the unique result set only. This is only a minor issue with the display output.
* There are areas for optimization performance wise, specifically with array traversing/comparison as well as the implementation of the LD fuzzy matching. 
* The stringified JSON output of each row in the result set could look nicer.
* Unit tests should be added for the CSVAnalyzer component, but for the sake of timeboxing the task they were omitted.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EnhancedTable from './DataTable.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 700,
  },
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class TabLayout extends Component {
  state = {
    value: 0,
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, duplicates, uniques } = this.props;
    const { value } = this.state;

    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label={"Non Duplicates ("+uniques.length+")"}  />
            <Tab label={"Potential Duplicates ("+duplicates.length+")"} />
          </Tabs>
        </AppBar>
        {value === 0 && 
          <TabContainer>
            <EnhancedTable data={uniques} />
          </TabContainer>}
        {value === 1 && 
        <TabContainer>
            <EnhancedTable data={duplicates} />
        </TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(TabLayout);
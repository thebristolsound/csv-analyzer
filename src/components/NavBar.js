import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                  CSV Analyzer
                </Typography>
            </Toolbar>
        </AppBar>
        <Typography variant="subheading" color="inherit" style={{padding: '10px', paddingBottom: '0'}}>
            Select a .csv file to begin. Results will be displayed below.
        </Typography>
        </div>
    )
}
export default NavBar;
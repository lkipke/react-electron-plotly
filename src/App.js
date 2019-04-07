import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ScopeDisplay from './ScopeDisplay';
import ScopeDisplayReact from './ScopeDisplayReact';
import './App.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const App = ({ classes }) => {
  const [isReact, setIsReact] = useState(false);

  // separate text and actual updates to avoid unnecessary updates
  // while user is typing
  const [numPlots, setNumPlots] = useState(10);
  const [numPlotsText, setNumPlotsText] = useState(10);

  const [numPointsPerPlot, setNumPointsPerPlot] = useState(200);
  const [numPointsPerPlotText, setNumPointsPerPlotText] = useState(200);

  const [updateSpeed, setUpdateSpeed] = useState(500);
  const [updateSpeedText, setUpdateSpeedText] = useState(500);

  return (
    <div className="App">
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Button
            variant={isReact ? 'outlined' : 'contained'}
            color="primary"
            className={classes.button}
            onClick={() => setIsReact(!isReact)}
          >
            {isReact ? 'Use non-React version' : 'Use React version'}
          </Button>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-number-plots"
              label="Number of plots"
              className={classes.textField}
              value={numPlotsText}
              type="number"
              onChange={event => {
                setNumPlotsText(Number(event.target.value));
              }}
              margin="normal"
            />
            <TextField
              id="standard-number-points-per-plot"
              label="Number of data points to plot"
              className={classes.textField}
              value={numPointsPerPlotText}
              type="number"
              onChange={event => {
                setNumPointsPerPlotText(Number(event.target.value));
              }}
              margin="normal"
            />
            <TextField
              id="standard-update-speed"
              label="Update speed (ms)"
              className={classes.textField}
              value={updateSpeedText}
              type="number"
              onChange={event => {
                setUpdateSpeedText(Number(event.target.value));
              }}
              margin="normal"
            />
          </form>
          <Button
            variant={'contained'}
            color="primary"
            className={classes.button}
            onClick={() => {
              setNumPlots(numPlotsText);
              setNumPointsPerPlot(numPointsPerPlotText);
              setUpdateSpeed(updateSpeedText);
            }}
          >
            Update plots
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: 200 }}>
        {isReact ? (
          <ScopeDisplayReact
            numPlots={numPlots}
            updateSpeed={updateSpeed}
            numPointsToPlotEachTick={numPointsPerPlot}
          />
        ) : (
          <ScopeDisplay
            numPlots={numPlots}
            updateSpeed={updateSpeed}
            numPointsToPlotEachTick={numPointsPerPlot}
          />
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(App);

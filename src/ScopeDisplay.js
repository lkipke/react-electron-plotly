import React, { Component } from 'react';
import Plotly from 'plotly.js';

import generateData from './generateData';

const COLORS = ['red', 'green', 'blue'];

class ScopeDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: generateData(props.numPlots),
      layout: {
        width: 1000,
        height: props.numPlots * 300,
        title: 'Scope Display',
        datarevision: 0,
      },
      sliceNum: 1,
      plots: [],
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.setUpGraph();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.numPlots !== prevProps.numPlots ||
      this.props.updateSpeed !== prevProps.updateSpeed
    ) {
      clearInterval(this.interval);

      if (this.props.numPlots !== prevProps.numPlots) {
        this.setState(
          {
            data: generateData(this.props.numPlots),
          },
          () => this.setUpGraph()
        );
      } else {
        this.setUpGraph();
      }
    }
  }

  tick() {
    const { sliceNum, data } = this.state;
    const { numPlots, numPointsToPlotEachTick } = this.props;

    const plots = [];
    for (let i = 0; i < numPlots; i++) {
      plots.push({
        y: data[i].slice(
          numPointsToPlotEachTick * sliceNum,
          numPointsToPlotEachTick * sliceNum + numPointsToPlotEachTick
        ),
        line: { color: COLORS[i % COLORS.length] },
      });
    }

    const newSliceNum =
      (sliceNum + 1) * numPointsToPlotEachTick >= 100000 ? 1 : sliceNum + 1;

    this.setState(
      oldState => ({
        plots,
        sliceNum: newSliceNum,
        layout: {
          ...oldState.layout,
          datarevision: oldState.layout.datarevision + 1,
        },
      }),
      () => {
        Plotly.react('graph', this.state.plots, {
          height: numPlots * 300,
          title: 'Scope display',
        });
      }
    );
  }

  setUpGraph() {
    const { data } = this.state;
    const { numPlots, updateSpeed, numPointsToPlotEachTick } = this.props;

    const plots = [];
    for (let i = 0; i < numPlots; i++) {
      plots.push({
        y: data[i].slice(0, numPointsToPlotEachTick),
        line: { color: COLORS[i % COLORS.length] },
      });
    }
    this.setState(
      {
        plots,
      },
      () => {
        Plotly.react('graph', this.state.plots, {
          height: numPlots * 300,
          title: 'Scope display',
        });
      }
    );

    this.interval = setInterval(() => this.tick(), updateSpeed);
  }

  render() {
    return <div id="graph" />;
  }
}

export default ScopeDisplay;

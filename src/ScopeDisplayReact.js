import React from 'react';
import Plot from 'react-plotly.js';

import generateData from './generateData';

const COLORS = ['red', 'green', 'blue'];

class ScopeDisplayReact extends React.Component {
  constructor(props) {
    super(props);

    const dataStore = generateData(props.numPlots);
    const data = [];
    for (let i = 0; i < props.numPlots; i++) {
      data.push({
        y: dataStore[i].slice(0, props.numPointsToPlotEachTick),
        line: { color: COLORS[i % COLORS.length] },
      });
    }

    this.state = {
      dataStore,
      data,
      layout: {
        width: 1000,
        height: props.numPlots * 300,
        title: 'Scope Display React',
      },
      frames: [],
      config: {},
      revision: 0,
      sliceNum: 1,
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), this.props.updateSpeed);
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
        this.setState(oldState => ({
          dataStore: generateData(this.props.numPlots),
          revision: oldState.revision + 1,
        }));
      }
      this.interval = setInterval(() => this.tick(), this.props.updateSpeed);
    }
  }

  tick() {
    const { sliceNum, dataStore } = this.state;
    const { numPlots, numPointsToPlotEachTick } = this.props;

    const data = [];
    for (let i = 0; i < numPlots; i++) {
      data.push({
        y: dataStore[i].slice(
          numPointsToPlotEachTick * sliceNum,
          numPointsToPlotEachTick * sliceNum + numPointsToPlotEachTick
        ),
        line: { color: COLORS[i % COLORS.length] },
      });
    }

    const newSliceNum =
      (sliceNum + 1) * numPointsToPlotEachTick >= 100000 ? 1 : sliceNum + 1;

    this.setState(oldState => {
      return {
        sliceNum: newSliceNum,
        revision: oldState.revision + 1,
        data,
        layout: {
          ...oldState.layout,
          height: numPlots * 300,
        },
      };
    });
  }

  render() {
    return (
      <Plot
        data={this.state.data}
        layout={this.state.layout}
        revision={this.state.revision}
        onInitialized={figure => this.setState(figure)}
      />
    );
  }
}

export default ScopeDisplayReact;

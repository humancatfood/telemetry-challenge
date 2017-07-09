import React from 'react';
import { connect } from 'react-redux';

import { connectDashboard, disconnectDashboard } from './../data/actions';



@connect(state => ({

  speed: state.telemetry.speed,
  minSpeed: state.telemetry.minSpeed,
  maxSpeed: state.telemetry.maxSpeed,

  altitude: state.telemetry.altitude,
  minAltitude: state.telemetry.minAltitude,
  maxAltitude: state.telemetry.maxAltitude

}), {
  connectDashboard,
  disconnectDashboard
})
export default class Dashboard extends React.Component
{
  componentDidMount()
  {
    this.props.connectDashboard();
  }

  componentWillUnmount()
  {
    this.props.disconnectDashboard();
  }

  render ()
  {
    const { speed, minSpeed, maxSpeed, altitude, minAltitude, maxAltitude } = this.props;

    return (
      <div id="dashboard">

        <div id="numeric-speed" className="numeric-gauge">{ speed }</div>
        <div id="numeric-speed-min" className="numeric-display">{ minSpeed }</div>
        <div id="numeric-speed-max" className="numeric-display">{ maxSpeed }</div>
        <div id="numeric-speed-ave" className="numeric-display">{ speed }</div>

        <div id="numeric-altitude" className="numeric-gauge">{ Number(altitude / 1000).toFixed(1) }</div>
        <div id="numeric-altitude-min" className="numeric-display">{ minAltitude }</div>
        <div id="numeric-altitude-max" className="numeric-display">{ maxAltitude }</div>
        <div id="numeric-altitude-ave" className="numeric-display">{ speed }</div>

      </div>
    );
  }
}





import React from 'react';
import { connect } from 'react-redux';

import { connectDashboard, disconnectDashboard } from './../data/actions';



@connect(state => ({

  landingGear: state.controls.landingGear,
  flaps: state.controls.flaps,

  speed: state.telemetry.speed,
  minSpeed: state.telemetry.minSpeed,
  maxSpeed: state.telemetry.maxSpeed,
  averageSpeed: state.telemetry.averageSpeed,

  altitude: state.telemetry.altitude,
  minAltitude: state.telemetry.minAltitude,
  maxAltitude: state.telemetry.maxAltitude,
  averageAltitude: state.telemetry.averageAltitude,

  isConnected: state.connection.isConnected,
  isConnecting: state.connection.isConnecting

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
    const { speed, minSpeed, maxSpeed, averageSpeed,
            altitude, minAltitude, maxAltitude, averageAltitude,
            landingGear, flaps,
            isConnected, isConnecting } = this.props;

    return (
      <div id="dashboard">

        <div id="numeric-speed" className="numeric-gauge">{ speed }</div>
        <div id="numeric-speed-min" className="numeric-display">{ minSpeed }</div>
        <div id="numeric-speed-max" className="numeric-display">{ maxSpeed }</div>
        <div id="numeric-speed-ave" className="numeric-display">{ Number(averageSpeed).toFixed(1) }</div>

        <div id="numeric-altitude" className="numeric-gauge">{ Number(altitude / 1000).toFixed(1) }</div>
        <div id="numeric-altitude-min" className="numeric-display">{ minAltitude }</div>
        <div id="numeric-altitude-max" className="numeric-display">{ maxAltitude }</div>
        <div id="numeric-altitude-ave" className="numeric-display">{ Number(averageAltitude).toFixed(1) }</div>

        {
          landingGear ?
            <div id="landing-gear-status" className="on" /> :
            <div id="landing-gear-status" className="off" />
        }

        <div id="flaps-status" className={ `position-${ flaps }` } />

        {
          isConnected ?
            <div id="connection-status" className="connected">Connected</div> :
            isConnecting ?
              <div id="connection-status" className="connecting">Connecting</div> :
              <div id="connection-status" className="disconnected">Disconnected</div>
        }

      </div>
    );
  }
}





import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { connectDashboard, disconnectDashboard } from './../data/actions';

import { NumericDisplay, NumericGaugeDigital, NumericGaugeAnalog } from './DashboardElements';


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

        <NumericGaugeDigital id="numeric-speed" value={ speed } />

        <NumericDisplay id="numeric-speed-min" value={ minSpeed } />
        <NumericDisplay id="numeric-speed-max" value={ maxSpeed } />
        <NumericDisplay id="numeric-speed-ave" value={ averageSpeed } />

        <NumericGaugeAnalog id="numeric-altitude" value={ altitude / 1000 } />
        <NumericDisplay id="numeric-altitude-min" value={ minAltitude } />
        <NumericDisplay id="numeric-altitude-max" value={ maxAltitude } />
        <NumericDisplay id="numeric-altitude-ave" value={ averageAltitude } />

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





import React from 'react';
import { connect } from 'react-redux';

import { toggleLandingGear, setFlapsPosition, connectToServer, disconnectFromServer } from './../data/actions';

import { ConnectionStatusDisplay, LandingGearDisplay,
         NumericDisplay, NumericGaugeDigital, NumericGaugeAnalog,
         NeedleGaugeSimple, NeedleGaugeClock } from './DashboardElements';

import { FlapStatusDisplay } from './FlapsStatusDisplay';


@connect(state => ({
  controls: state.controls,
  telemetry: state.telemetry,
  connection: state.connection
}), {
  toggleLandingGear,
  setFlapsPosition,
  connectToServer,
  disconnectFromServer
})
export default class Dashboard extends React.Component
{
  componentDidMount()
  {
    this.props.connectToServer();
  }

  componentWillUnmount()
  {
    this.props.disconnectFromServer();
  }

  render ()
  {
    const { telemetry, controls, connection, toggleLandingGear, setFlapsPosition } = this.props;

    const { airspeed, minSpeed, maxSpeed, averageSpeed,
            altitude, minAltitude, maxAltitude, averageAltitude } = telemetry;

    const { landingGear, flaps } = controls;

    const { isConnected, isConnecting } = connection;


    return (
      <div id="dashboard">

        <NeedleGaugeSimple id="speedometer" value={ airspeed } max="500"/>
        <NeedleGaugeClock id="altimeter" value={ altitude / 1000 } max="10" />

        <NumericGaugeDigital id="numeric-speed" value={ airspeed } />

        <NumericDisplay id="numeric-speed-min" value={ minSpeed } />
        <NumericDisplay id="numeric-speed-max" value={ maxSpeed } />
        <NumericDisplay id="numeric-speed-ave" value={ averageSpeed } />

        <NumericGaugeAnalog id="numeric-altitude" value={ altitude / 1000 } />

        <NumericDisplay id="numeric-altitude-min" value={ minAltitude } />
        <NumericDisplay id="numeric-altitude-max" value={ maxAltitude } />
        <NumericDisplay id="numeric-altitude-ave" value={ averageAltitude } />

        <LandingGearDisplay on={ landingGear } onToggle={ on => toggleLandingGear(on) }/>
        <FlapStatusDisplay position={ flaps } onSetPosition={ pos => setFlapsPosition(pos) } />

        <ConnectionStatusDisplay isConnected={ isConnected } isConnecting={ isConnecting } />

      </div>
    );
  }
}





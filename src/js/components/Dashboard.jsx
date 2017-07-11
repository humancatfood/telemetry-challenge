import React from 'react';
import { connect } from 'react-redux';

import connectionInterface from './../backend-services/connection-interface';
import { toggleLandingGear } from './../data/actions';

import { ConnectionStatusDisplay, FlapStatusDisplay, LandingGearDisplay,
         NumericDisplay, NumericGaugeDigital, NumericGaugeAnalog,
         NeedleGaugeSimple, NeedleGaugeClock } from './DashboardElements';



@connect(state => ({
  controls: state.controls,
  telemetry: state.telemetry,
  connection: state.connection
}), {
  toggleLandingGear
})
export default class Dashboard extends React.Component
{
  componentDidMount()
  {
    connectionInterface.connectToServer();
  }

  componentWillUnmount()
  {
    connectionInterface.disconnectFromServer();
  }

  render ()
  {
    const { telemetry, controls, connection, toggleLandingGear } = this.props;

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
        <FlapStatusDisplay position={ flaps } />
        <ConnectionStatusDisplay isConnected={ isConnected } isConnecting={ isConnecting } />

      </div>
    );
  }
}





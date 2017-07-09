import React from 'react';
import numeral from 'numeral';



export const NumericDisplay = ({id, value}) => (
  <div id={ id } className="numeric-display">{ numeral(value).format('0,0.0') }</div>
);


export const NumericGaugeDigital = ({id, value}) => (
  <div id={ id } className="numeric-gauge-digital">{ numeral(value % 1000).format('000') }</div>
);


export const NumericGaugeAnalog = ({id, value}) => (
  <div id={ id } className="numeric-gauge-analog">{ numeral(value % 1000).format('0.0') }</div>
);


export const LandingGearDisplay = ({ on }) => (
  <div id="landing-gear-status" className={ on ? 'on' : 'off' } />
);


export const FlapStatusDisplay = ({ position }) => (
  <div id="flaps-status" className={ `position-${ position }` } />
);


export const ConnectionStatusDisplay = ({ isConnected, isConnecting }) => (
  isConnected ?
    <div id="connection-status" className="connected">Connected</div> :
    isConnecting ?
      <div id="connection-status" className="connecting">Connecting</div> :
      <div id="connection-status" className="disconnected">Disconnected</div>
);
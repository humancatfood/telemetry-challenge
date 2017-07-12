import React from 'react';
import numeral from 'numeral';

import smallNeedle from './../../img/needle-small.png';
import bigNeedle from './../../img/needle-big.png';



export const NumericDisplay = ({id, value}) => (
  <div id={ id } className="numeric-display">{ numeral(value).format('0,0.0') }</div>
);


export const NumericGaugeDigital = ({id, value}) => (
  <div id={ id } className="numeric-gauge-digital">{ numeral(value % 1000).format('000') }</div>
);


export const NumericGaugeAnalog = ({id, value}) => (
  <div id={ id } className="numeric-gauge-analog">{ numeral(value % 1000).format('0.0') }</div>
);


export const LandingGearDisplay = ({ on, onToggle }) => (
  <div id="landing-gear-status" className={ on ? 'on' : 'off' } onClick={ () => onToggle(!on) } />
);


export const ConnectionStatusDisplay = ({ isConnected, isConnecting, onToggle }) => (
  isConnected ?
    <div id="connection-status" className="connected" onClick={ () => onToggle(false) } >Connected</div> :
    isConnecting ?
      <div id="connection-status" className="connecting" onClick={ () => onToggle(false) } >Connecting</div> :
      <div id="connection-status" className="disconnected" onClick={ () => onToggle(true) } >Disconnected</div>
);


export const NeedleGaugeSimple = ({ id, value, max }) => (
  <div id={ id } className="gauge-needle" style={ getPrefixedRotationStyle((value / max) * 360 ) }>
    <img src={ bigNeedle } />
  </div>
);


export const NeedleGaugeClock = ({ id, value, max }) => (
  <div id={ id }>
    <div className="gauge-needle" style={ getPrefixedRotationStyle((value / max) * 360 ) }>
      <img src={ bigNeedle } />
    </div>
    <div className="gauge-needle" style={ getPrefixedRotationStyle((value / (max * 10)) * 360 ) }>
      <img src={ smallNeedle } />
    </div>
  </div>
);


function getPrefixedRotationStyle (degrees)
{
  const rotate = `rotate(${ degrees }deg)`;
  return {
    transform: rotate,
    '-webkit-transform': rotate,
    '-moz-transform': rotate
  };
}

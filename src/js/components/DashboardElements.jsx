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

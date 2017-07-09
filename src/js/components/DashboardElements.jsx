import React from 'react';
import numeral from 'numeral';



export const NumericDisplay= ({id, value}) => (
  <div id={ id } className="numeric-display">{ numeral(value).format('0,0.0') }</div>
);

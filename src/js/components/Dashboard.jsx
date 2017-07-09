import React from 'react';
import { connect } from 'react-redux';



@connect(state => ({
  speed: state.speed
}))
export default class Dashboard extends React.Component
{
  render ()
  {
    const { speed } = this.props;

    return (
      <div id="dashboard">

        <div id="numeric-speed" className="numeric-gauge">{ speed }</div>

      </div>
    );
  }
}





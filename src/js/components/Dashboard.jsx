import React from 'react';
import { connect } from 'react-redux';

import { connectDashboard, disconnectDashboard } from './../data/actions';



@connect(state => ({
  speed: state.telemetry.speed
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
    const { speed } = this.props;

    return (
      <div id="dashboard">

        <div id="numeric-speed" className="numeric-gauge">{ speed }</div>

      </div>
    );
  }
}





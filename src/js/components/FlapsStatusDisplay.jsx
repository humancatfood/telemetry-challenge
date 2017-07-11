import React from 'react';



export class FlapStatusDisplay extends React.Component
{

  componentDidMount()
  {
    $(this.refs.handle).draggable({
      grid: [24, 0],
      containment: "parent",
      stop: (event, { position }) => this.props.onSetPosition(position.left / 24)
    });
  }

  render() {
    const { position } = this.props;
    return (
      <div id="flaps-status">
        <div className="handle" ref="handle" style={{ left: `${ position * 24 }px` }}/>
      </div>
    );
  }

}

import PropTypes from 'prop-types';
import React from 'react';

import ControlPoint from './ControlPoint';
import SelectionBox from './SelectionBox';

export default class Rect extends React.Component {
  static propTypes = {
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    onMouseDown: PropTypes.func.isRequired,
    rect: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  getCoords() {
    let { x, y } = this.props.rect;

    if (this.props.offsetX != null) {
      x = this.props.offsetX;
      y = this.props.offsetY;
    }

    return { x, y };
  }

  render() {
    return this.props.selected ? this.renderSelected() : this.renderRect();
  }

  renderSelected() {
    const { x, y } = this.getCoords();
    const { height, width } = this.props.rect;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    return <g transform={`translate(${x},${y})`}>
      {this.renderRectEl({ x: 0, y: 0 })}
      <SelectionBox height={height} width={width} />
      <ControlPoint x={0} y={0} /> {/* top left */}
      <ControlPoint x={halfWidth} y={0} /> {/* top middle */}
      <ControlPoint x={width} y={0} /> {/* top right */}
      <ControlPoint x={width} y={height / 2} /> {/* middle right */}
      <ControlPoint x={width} y={height} /> {/* bottom right */}
      <ControlPoint x={halfWidth} y={height} /> {/* bottom middle */}
      <ControlPoint x={0} y={height} /> {/* bottom left */}
      <ControlPoint x={0} y={halfHeight} /> {/* middle left */}
    </g>;
  }

  renderRect() {
    const { rect } = this.props;
    return this.renderRectEl(this.getCoords());
  }

  renderRectEl(props) {
    const { height, id, width } = this.props.rect;
    return <rect
      data-id={id}
      onMouseDown={this.props.onMouseDown}
      height={height}
      width={width}
      {...props}
    />
  }
}

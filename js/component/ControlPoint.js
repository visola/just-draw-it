import PropTypes from 'prop-types';
import React from 'react';

const SIZE = 10;
const HALF_SIZE = SIZE / 2;

export default class ControlPoint extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      initialX: null,
      initialY: null,
      offsetX: 0,
      offsetY: 0,
    };
  }

  render() {
    return <rect
      data-control="true"
      fill="#e4e400"
      height={SIZE}
      width={SIZE}
      x={this.props.x + (this.state.offsetX - HALF_SIZE)}
      y={this.props.y + (this.state.offsetY - HALF_SIZE)}
    />;
  }
}

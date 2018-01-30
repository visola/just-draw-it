import PropTypes from 'prop-types';
import React from 'react';

const SIZE = 10;
const HALF_SIZE = SIZE / 2;

export default class ControlPoint extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }

  render() {
    return <rect
      fill="#e4e400"
      height={SIZE}
      width={SIZE}
      x={this.props.x - HALF_SIZE}
      y={this.props.y - HALF_SIZE}
    />;
  }
}

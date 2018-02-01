import PropTypes from 'prop-types';
import React from 'react';

export default class Rect extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    rect: PropTypes.object.isRequired,
  }

  render() {
    const { fill, height, id, stroke, width } = this.props.rect;
    const { x, y } = this.props;

    return <rect
      fill={fill}
      stroke={stroke}
      data-id={id}
      data-drawable="true"
      data-type="rect"
      height={height}
      width={width}
      x={x}
      y={y}
    />
  }
}

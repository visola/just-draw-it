import PropTypes from 'prop-types';
import React from 'react';

export default class SelectionBox extends React.Component {
  static propTypes = {
    rect: PropTypes.object.isRequired,
  }

  render() {
    const { height, width, x, y } = this.props.rect;
    return <rect
      fill="none"
      stroke="#00FF00"
      strokeDasharray="5,5"
      strokeWidth="3"
      height={height}
      width={width}
      x={x}
      y={y}
    />;
  }
}

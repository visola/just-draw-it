import PropTypes from 'prop-types';
import React from 'react';

export default class SelectionBox extends React.Component {
  static propTypes = {
    rect: PropTypes.object.isRequired,
  }

  render() {
    const {
      height, width, x, y,
    } = this.props.rect;
    return <rect
      fill="none"
      stroke="#000"
      strokeDasharray="5,5"
      strokeWidth="1"
      height={height + 2}
      width={width + 2}
      x={x - 1}
      y={y - 1}
    />;
  }
}

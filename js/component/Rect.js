import PropTypes from 'prop-types';
import React from 'react';

export default class Rect extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    rect: PropTypes.object.isRequired,
  }

  render() {
    const { height, id, width } = this.props.rect;
    const { x, y } = this.props;

    return <rect
      data-id={id}
      onMouseDown={this.props.onMouseDown}
      height={height}
      width={width}
      x={x}
      y={y}
    />
  }
}

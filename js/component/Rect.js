import PropTypes from 'prop-types';
import React from 'react';

export default class Rect extends React.Component {
  static propTypes = {
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    onMouseDown: PropTypes.func.isRequired,
    rect: PropTypes.object.isRequired,
  }

  render() {
    const { rect } = this.props;
    let { x, y } = rect;

    if (this.props.offsetX != null) {
      x = this.props.offsetX;
      y = this.props.offsetY;
    }

    if (isNaN(x) || isNaN(y)) {
      return null;
    }

    return <rect
      data-id={rect.id}
      onMouseDown={this.props.onMouseDown}
      height={rect.height}
      width={rect.width}
      x={x}
      y={y}
    />
  }
}

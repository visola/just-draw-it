import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

@observer
export default class Rect extends React.Component {
  static propTypes = {
    drawable: PropTypes.object.isRequired,
  }

  render() {
    const {
      fill, height, id, stroke, strokeWidth, x, y, width,
    } = this.props.drawable;

    return <rect
      fill={fill}
      strokeWidth={strokeWidth}
      stroke={stroke}
      data-id={id}
      data-type="drawables"
      height={height}
      width={width}
      x={x}
      y={y}
    />;
  }
}

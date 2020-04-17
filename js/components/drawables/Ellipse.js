import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

@observer
export default class Ellipse extends React.Component {
  static propTypes = {
    drawable: PropTypes.object.isRequired,
  }

  render() {
    const {
      fill, height, id, stroke, strokeWidth, x, y, width,
    } = this.props.drawable;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    return <ellipse
      fill={fill}
      strokeWidth={strokeWidth}
      stroke={stroke}
      data-id={id}
      data-type="drawables"
      cx={x + halfWidth}
      cy={y + halfHeight}
      rx={halfWidth}
      ry={halfHeight}
    />;
  }
}

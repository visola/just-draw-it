import PropTypes from 'prop-types';
import React from 'react';

export default class ControlPoint extends React.Component {
  static propTypes = {
    drawable: PropTypes.object.isRequired,
  }

  render() {
    const { drawable } = this.props;
    return <rect
      data-id={drawable.id}
      data-type="controlPoints"
      fill="#AABB00"
      height={drawable.height}
      width={drawable.width}
      x={drawable.x - (drawable.width / 2)}
      y={drawable.y - (drawable.height / 2)}
    />;
  }
}

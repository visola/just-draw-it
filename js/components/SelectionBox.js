import PropTypes from 'prop-types';
import React from 'react';

export default class SelectionBox extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  render() {
    return <rect
      fill="none"
      stroke="#00FF00"
      strokeDasharray="5,5"
      strokeWidth="3"
      height={this.props.height}
      width={this.props.width}
      x="0"
      y="0"
    />;
  }
}

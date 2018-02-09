import PropTypes from 'prop-types';
import React from 'react';

import BaseIcon from './BaseIcon';

export default class ColorsIcon extends BaseIcon {
  static propTypes = {
    strokeColor: PropTypes.string.isRequired,
    fillColor: PropTypes.string.isRequired,
    onStrokeClick: PropTypes.func.isRequired,
    onFillClick: PropTypes.func.isRequired,
  }

  render() {
    return <svg className="icon">
      <rect
        onClick={this.props.onStrokeClick}
        stroke="#000"
        strokeWidth="1"
        fill={this.props.strokeColor}
        x="40%"
        y="40%"
        width="55%"
        height="55%"
      />
      <rect
        onClick={this.props.onFillClick}
        stroke="#000"
        strokeWidth="1"
        fill={this.props.fillColor}
        x="1"
        y="1"
        width="55%"
        height="55%"
      />
    </svg>;
  }
}

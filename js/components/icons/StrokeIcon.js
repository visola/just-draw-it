import PropTypes from 'prop-types';
import React from 'react';

import BaseIcon from './BaseIcon';

export default class StrokeIcon extends BaseIcon {
  static propTypes = {
    size: PropTypes.number.isRequired,
  }

  render() {
    const { size } = this.props;
    return <svg className="icon">
      <rect x="2%" y={(this.height - size) / 2} height={size} width="96%" />
    </svg>;
  }
}

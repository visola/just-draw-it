import PropTypes from 'prop-types';
import React from 'react';

export default class StrokeIcon extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
  }

  render() {
    const { size } = this.props;
    return <svg className="icon">
      <rect x="2%" y={(20 - size) / 2} height={size} width="96%" />
    </svg>;
  }
}

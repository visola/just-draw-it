import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import PointerIcon from '../icons/PointerIcon';

export default class MoveResizeSelectToolComponent extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <button
        className={classnames({ "btn":true, "btn-default": true, "active": this.props.selected })}
        onClick={this.props.onClick}
      >
        <PointerIcon />
      </button>
    );
  }
}

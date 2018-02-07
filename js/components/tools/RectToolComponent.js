import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import RectIcon from '../icons/RectIcon';

export default class RectToolComponent extends React.Component {
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
        <RectIcon />
      </button>
    );
  }
}

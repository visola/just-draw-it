import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import StrokeIcon from '../icons/StrokeIcon';
import StrokeWidthIcon from '../icons/StrokeWidthIcon';

export default class StrokeWidthToolComponent extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    tool: PropTypes.object.isRequired,
  }

  handleChangeStroke(newSize) {
    this.props.tool.setWidth(newSize);
  }

  render() {
    return (
      <div>
        <button
          className={classnames({ "btn":true, "btn-default": true, "active": this.props.selected })}
          onClick={this.props.onClick}
        >
          <StrokeWidthIcon />
        </button>
        <div>
          {this.renderWidths()}
        </div>
      </div>
    );
  }

  renderWidths() {
    if (!this.props.selected) {
      return null;
    }

    const sizes = [1, 3, 5, 8, 13];
    return sizes.map((size) => (
      <button key={size} className="btn btn-default" onClick={this.handleChangeStroke.bind(this, size)}>
        <StrokeIcon size={size} />
      </button>
    ));
  }
}

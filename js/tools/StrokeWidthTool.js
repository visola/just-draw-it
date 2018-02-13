import classnames from 'classnames';
import React from 'react';

import AbstractSelectionTool from './AbstractSelectionTool';

import StrokeIcon from '../components/icons/StrokeIcon';
import StrokeWidthIcon from '../components/icons/StrokeWidthIcon';

export default class StrokeWidthTool extends AbstractSelectionTool {
  isActive() {
    return !this.selection.empty;
  }

  render(selected, onClick) {
    return (
      <div key="stroke-width-tool">
        <button
          className={classnames({ btn: true, 'btn-default': true, active: selected })}
          onClick={onClick}
        >
          <StrokeWidthIcon />
        </button>
        <div>
          {this.renderWidths(selected)}
        </div>
      </div>
    );
  }

  renderWidths(selected) {
    if (!selected) {
      return null;
    }

    const sizes = [1, 3, 5, 8, 13];
    return sizes.map((size) => (
      <button key={size} className="btn btn-default" onClick={this.setWidth.bind(this, size)}>
        <StrokeIcon size={size} />
      </button>
    ));
  }

  setWidth(newWidth) {
    this.selection.forEach((d) => {
      d.strokeWidth = newWidth;
    });
    this.emit('done');
  }
}

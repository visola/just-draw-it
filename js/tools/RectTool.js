import classnames from 'classnames';
import React from 'react';

import AbstractTool from './AbstractTool';
import Rectangle from '../models/Rectangle';
import RectIcon from '../components/icons/RectIcon';

export default class RectTool extends AbstractTool {
  onMouseDown(position) {
    this.initialPosition = position;
    this.rect = new Rectangle();
    this.rect.x = position.x;
    this.rect.y = position.y;
    this.rect.height = 0;
    this.rect.width = 0;
    this.rect.fill = this.drawingProperties.fillColor;
    this.rect.stroke = this.drawingProperties.strokeColor;

    this.drawables.push(this.rect);
  }

  onDrag(position) {
    if (this.initialPosition) {
      let height = position.offsetY;
      let width = position.offsetX;

      if (height < 0) {
        height = Math.abs(height);
        this.rect.y = this.initialPosition.y - height;
      }

      if (width < 0) {
        width = Math.abs(width);
        this.rect.x = this.initialPosition.x - width;
      }

      this.rect.height = height;
      this.rect.width = width;
    }
  }

  onDrop() {
    this.selection.clear();
    this.selection.select(this.rect);
    this.initialPosition = null;
    this.rect = null;
    this.emit('done');
  }

  render(selected, onClick) {
    return (
      <button
        key="rect-tool"
        className={classnames({ btn: true, 'btn-default': true, active: selected })}
        onClick={onClick}
      >
        <RectIcon />
      </button>
    );
  }
}

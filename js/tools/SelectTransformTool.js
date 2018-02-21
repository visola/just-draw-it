import classnames from 'classnames';
import React from 'react';

import AbstractTool from './AbstractTool';
import PointerIcon from '../components/icons/PointerIcon';

export default class SelectTransformTool extends AbstractTool {
  constructor(drawables, drawingProperties, selection) {
    super(drawables, drawingProperties, selection);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.initialPositionById = {};
  }

  onMouseDown(position, dragging) {
    const { drawables } = dragging;

    if (drawables == null) {
      this.selection.clear();
      this.initialPositionById = {};
    } else {
      const selection = drawables[drawables.length - 1];
      if (!position.shiftKey && !this.selection.isSelected(selection)) {
        this.selection.clear();
        this.initialPositionById = {};
      }

      this.selection.addToSelection(selection);
      this.selection.forEach((d) => {
        this.initialPositionById[d.id] = { x: d.x, y: d.y };
      });
    }
  }

  onDrag(position) {
    const { offsetX, offsetY } = position;
    this.selection.forEach((d) => {
      d.x = this.initialPositionById[d.id].x + offsetX;
      d.y = this.initialPositionById[d.id].y + offsetY;
    });
  }

  render(selected, onClick) {
    return (
      <button
        key="select-transform-tool"
        className={classnames({ btn: true, 'btn-default': true, active: selected })}
        onClick={onClick}
      >
        <PointerIcon />
      </button>
    );
  }
}

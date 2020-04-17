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
    this.initialSizeById = {};
    this.clickedControlPoint = null;
  }

  onMouseDown(position, dragging) {
    const { controlPoints, drawables } = dragging;
    this.clickedControlPoint = null;

    if (drawables == null && controlPoints == null) {
      this.selection.clear();
      this.initialPositionById = {};

    } else if (controlPoints != null) {
      // Starting to resize
      this.clickedControlPoint = controlPoints[0];
      this.selection.forEach((d) => {
        this.initialPositionById[d.id] = { x: d.x, y: d.y };
        this.initialSizeById[d.id] = { width: d.width, height: d.height };
      });

    } else {
      // Starting to move
      const selection = drawables[drawables.length - 1];
      if (!position.shiftKey && !this.selection.contains(selection)) {
        this.selection.clear();
        this.initialPositionById = {};
      }

      this.selection.push(selection);
      this.selection.forEach((d) => {
        this.initialPositionById[d.id] = { x: d.x, y: d.y };
      });
    }
  }

  onDrag(position) {
    if (this.clickedControlPoint) {
      this.onResize(position);
    } else {
      this.onMove(position);
    }
  }

  onMove({ offsetX, offsetY }) {
    this.selection.forEach((d) => {
      d.x = this.initialPositionById[d.id].x + offsetX;
      d.y = this.initialPositionById[d.id].y + offsetY;
    });
  }

  onResize({ offsetX, offsetY }) {
    const { h, v } = this.clickedControlPoint.position;

    // Resize
    this.selection.forEach((d) => {
      let newWidth, newHeight;

      if (h === 'w') {
        d.x = this.initialPositionById[d.id].x + offsetX;
        newWidth = this.initialSizeById[d.id].width - offsetX;
      } else {
        newWidth = this.initialSizeById[d.id].width + offsetX;
      }

      if (v === 'n') {
        d.y = this.initialPositionById[d.id].y + offsetY;
        newHeight = this.initialSizeById[d.id].height - offsetY;
      } else {
        newHeight = this.initialSizeById[d.id].height + offsetY;
      }

      if (newWidth < 0) {
        newWidth = 0;
      }

      if (newHeight < 0) {
        newHeight = 0;
      }

      d.height = newHeight;
      d.width = newWidth;
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

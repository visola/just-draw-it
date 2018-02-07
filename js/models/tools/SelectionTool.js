import { action, observable } from 'mobx';

import AbstractTool from './AbstractTool';

export default class SelectionTool extends AbstractTool {
  @observable selection = [];
  
  constructor() {
    super();
    this.handleDrop = this.handleDrop.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  @action
  handleMouseDown(dragging, offsetX, offsetY) {
    const { drawables } = dragging;
    this.selection.clear();
    if (drawables.length > 0) {
      const selection = drawables[0];
      this.initialX = selection.x;
      this.initialY = selection.y;

      this.selection.push(selection);
    }
  }

  @action
  handleDrag(dragging, offsetX, offsetY) {
    if (this.selection.length > 0) {
      this.selection[0].x = this.initialX + offsetX;
      this.selection[0].y = this.initialY + offsetY;
    }
  }
}

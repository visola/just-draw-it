import { action, observable } from 'mobx';

import AbstractTool from './AbstractTool';

export default class SelectionTool extends AbstractTool {
  @observable selection = [];
  
  constructor() {
    super();
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDrag = this.handleOnDrag.bind(this);
  }

  @action
  handleOnDragStart(dragging, offsetX, offsetY) {
    const { drawables } = dragging;
    if (drawables.length > 0) {
      const selection = drawables[0];
      this.initialX = selection.x;
      this.initialY = selection.y;

      this.selection.clear();
      this.selection.push(selection);
    }
  }

  @action
  handleOnDrag(dragging, offsetX, offsetY) {
    if (this.selection.length > 0) {
      this.selection[0].x = this.initialX + offsetX;
      this.selection[0].y = this.initialY + offsetY;
    }
  }
}

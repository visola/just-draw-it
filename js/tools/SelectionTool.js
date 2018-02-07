import AbstractTool from './AbstractTool';

export default class SelectionTool extends AbstractTool {
  constructor(drawables, selection) {
    super(drawables, selection);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  onMouseDown(position, dragging) {
    const { drawables } = dragging;
    this.selection.clear();
    if (drawables.length > 0) {
      const selection = drawables[drawables.length - 1];
      this.initialX = selection.x;
      this.initialY = selection.y;

      this.selection.select(selection);
    }
  }

  onDrag(position, dragging) {
    const { drawables } = this.selection;
    if (drawables.length > 0) {
      const { offsetX, offsetY } = position;
      drawables[0].x = this.initialX + offsetX;
      drawables[0].y = this.initialY + offsetY;
    }
  }
}

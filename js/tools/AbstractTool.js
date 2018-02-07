export default class AbstractTool {
  constructor(drawables, selection) {
    this.drawables = drawables;
    this.selection = selection;
  }

  onDrop() {}
  onDrag() {}
  onMouseDown() {}
  onMouseMove() {}
}

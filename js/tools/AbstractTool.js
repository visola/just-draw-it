import EventEmitter from 'events';

export default class AbstractTool extends EventEmitter {
  constructor(drawables, drawingProperties, selection) {
    super();
    this.drawables = drawables;
    this.drawingProperties = drawingProperties;
    this.selection = selection;
  }

  onDrop() {}
  onDrag() {}
  onMouseDown() {}
  onMouseMove() {}
  onSVGChange() {}

  render() {
    throw new Error(`Not implemented for ${this}`);
  }
}

import EventEmitter from 'events';

export default class AbstractTool extends EventEmitter {
  constructor(drawables, selection) {
    super();
    this.drawables = drawables;
    this.selection = selection;
  }

  onDrop() {}
  onDrag() {}
  onMouseDown() {}
  onMouseMove() {}
}

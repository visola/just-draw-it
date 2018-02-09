import AbstractSelectionTool from './AbstractSelectionTool';

export default class StrokeWidthTool extends AbstractSelectionTool {
  isActive() {
    return !this.selection.empty;
  }

  setWidth(newWidth) {
    this.selection.forEach((d) => {
      d.strokeWidth = newWidth;
    });
    this.emit('done');
  }
}

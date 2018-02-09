import AbstractTool from './AbstractTool';

export default class ColorPickerTool extends AbstractTool {
  get fillColor() {
    return this.selection.empty ? this.drawingProperties.fillColor : this.selection.drawables[0].fill;
  }

  get strokeColor() {
    return this.selection.empty ? this.drawingProperties.strokeColor : this.selection.drawables[0].stroke;
  }

  setFillColor(newColor) {
    if (this.selection.empty) {
      this.drawingProperties.fillColor = newColor;
    } else {
      this.selection.drawables[0].fill = newColor;
    }
    this.emit('done');
  }

  setStrokeColor(newColor) {
    if (this.selection.empty) {
      this.drawingProperties.strokeColor = newColor;
    } else {
      this.selection.drawables[0].stroke = newColor;
    }
    this.emit('done');
  }
}

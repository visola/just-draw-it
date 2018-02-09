export default class Clickable {
  constructor(elements) {
    this.drawables = elements.drawables;
  }

  get isDraggable() {
    return this.drawables.length > 0;
  }
}

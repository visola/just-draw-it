import { action, computed, observable } from 'mobx';

export default class Selection {
  @observable drawables = [];

  @action
  clear() {
    this.drawables.clear();
  }

  @action
  addToSelection(drawable) {
    if (!this.isSelected(drawable)) {
      this.drawables.push(drawable);
    }
  }

  @computed
  get boundingRect() {
    if (this.drawables.length === 0) {
      return null;
    }

    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = 0;
    let maxY = 0;

    this.drawables.forEach((d) => {
      if (minX > d.x) {
        minX = d.x - d.strokeWidth;
      }
      if (minY > d.y) {
        minY = d.y - d.strokeWidth;
      }
      if (maxX < d.x + d.width) {
        maxX = d.x + d.width + d.strokeWidth;
      }
      if (maxY < d.y + d.height) {
        maxY = d.y + d.height + d.strokeWidth;
      }
    });

    return {
      x: minX,
      y: minY,
      height: maxY - minY,
      width: maxX - minX,
    };
  }

  @computed
  get empty() {
    return this.drawables.length === 0;
  }

  @action
  forEach(callback) {
    this.drawables.forEach(callback);
  }

  isSelected(drawable) {
    return this.drawables.findIndex((d) => d.id === drawable.id) >= 0;
  }

  @action
  select(drawable) {
    this.drawables.push(drawable);
  }
}

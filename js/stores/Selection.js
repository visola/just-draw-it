import { action, computed, observable } from 'mobx';

export default class Selection {
  @observable collection = [];

  @action
  clear() {
    this.collection.clear();
  }

  @action
  addToSelection(drawable) {
    if (!this.isSelected(drawable)) {
      this.collection.push(drawable);
    }
  }

  @computed
  get boundingRect() {
    if (this.collection.length === 0) {
      return null;
    }

    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = 0;
    let maxY = 0;

    this.collection.forEach((d) => {
      const halfStrokeWidth = d.strokeWidth / 2;
      if (minX > d.x) {
        minX = d.x - halfStrokeWidth;
      }
      if (minY > d.y) {
        minY = d.y - halfStrokeWidth;
      }
      if (maxX < d.x + d.width) {
        maxX = d.x + d.width + halfStrokeWidth;
      }
      if (maxY < d.y + d.height) {
        maxY = d.y + d.height + halfStrokeWidth;
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
    return this.collection.length === 0;
  }

  get first() {
    return this.collection[0];
  }

  @action
  forEach(callback) {
    this.collection.forEach(callback);
  }

  isSelected(drawable) {
    return this.collection.findIndex((d) => d.id === drawable.id) >= 0;
  }

  @action
  select(drawable) {
    this.collection.push(drawable);
  }
}

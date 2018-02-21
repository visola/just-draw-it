import { action, computed, observable } from 'mobx';

import Collection from './Collection';

export default class Selection extends Collection {
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

  @action
  push(drawable) {
    if (!this.contains(drawable)) {
      this.collection.push(drawable);
    }
  }

  @action
  select(drawable) {
    this.clear();
    this.push(drawable);
  }
}

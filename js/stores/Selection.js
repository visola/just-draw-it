import { action, computed, observable } from 'mobx';

export default class Selection {
  @observable drawables = [];

  @action
  clear() {
    this.drawables.clear();
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
        minX = d.x;
      }
      if (minY > d.y) {
        minY = d.y;
      }
      if (maxX < d.x + d.width) {
        maxX = d.x + d.width;
      }
      if (maxY < d.y + d.height) {
        maxY = d.y + d.height;
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
  select(drawable) {
    this.drawables.push(drawable);
  }
}

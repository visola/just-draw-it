import { action } from 'mobx';

import AbstractTool from './AbstractTool';
import Rectangle from '../models/Rectangle';

export default class RectTool extends AbstractTool {
  @action
  onMouseDown(position) {
    this.initialPosition = position;
    this.rect = new Rectangle();
    this.rect.x = position.x;
    this.rect.y = position.y;
    this.rect.height = 0;
    this.rect.width = 0;

    this.drawables.push(this.rect);
  }

  @action
  onDrag(position) {
    if (this.initialPosition) {
      this.rect.height = position.offsetY;
      this.rect.width = position.offsetX;
    }
  }

  @action
  onDrop() {
    this.initialPosition = null;
    this.rect = null;
  }
}

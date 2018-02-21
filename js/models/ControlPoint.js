import { observable } from 'mobx';

import ControlPointComponent from '../components/drawables/ControlPoint.js';
import Drawable from './Drawable';

export default class ControlPoint extends Drawable {
  @observable id;
  
  @observable x;
  @observable y;
  @observable height;
  @observable width;

  constructor(x, y, height = 15, width = 15, component = ControlPointComponent) {
    super();
    this.id = `${x},${y}`
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this._component = component;
  }

  get component() {
    return this._component;
  }
}

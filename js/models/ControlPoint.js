import { observable } from 'mobx';

import ControlPointComponent from '../components/drawables/ControlPoint.js';
import Drawable from './Drawable';

export default class ControlPoint extends Drawable {
  @observable id;
  
  @observable position;
  @observable x;
  @observable y;
  @observable height;
  @observable width;

  constructor(v_position, h_position, x, y, height = 15, width = 15, component = ControlPointComponent) {
    super();
    this.id = `cp_${v_position}${h_position}`;
    this.position = {v: v_position, h: h_position};
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

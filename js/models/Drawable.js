import { observable } from 'mobx';

export default class Drawable {
  @observable id = Date.now();

  @observable height;
  @observable width;
  @observable x;
  @observable y;

  @observable fill = '#cccccc';
  @observable stroke = '#000000';
  @observable strokeWidth = 1;

  get component() {
    throw new Error('Abstract type.');
  }

  get type() {
    throw new Error('Abstract type.');
  }
}

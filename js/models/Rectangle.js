import { observable } from 'mobx';

export default class Rectangle {
  type = "Rectangle";
  @observable height;
  @observable id = Date.now();
  @observable width;
  @observable x;
  @observable y;
  @observable fill = '#cccccc';
  @observable stroke = '#000000';
  @observable strokeWidth = 1;
}

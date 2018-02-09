import { observable } from 'mobx';

export default class DrawingProperties {
  @observable strokeColor = "#000000";
  @observable fillColor = "#FFFFFF"
}

import { action, computed, observable } from 'mobx';

export default class Drawables {
  @observable collection = [];

  find(id) {
    return this.collection.find((d) => d.id == id);
  }

  @computed
  get length () {
    return this.collection.length;
  }

  map(callback) {
    return this.collection.map(callback);
  }

  @action
  push(drawable) {
    this.collection.push(drawable);
  }

}

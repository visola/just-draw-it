import { action, computed, observable } from 'mobx';

export default class Drawables {
  @observable collection = [];

  find(callback) {
    return this.collection.find(callback);
  }

  findById(id) {
    const intId = parseInt(id, 10);
    return this.collection.find((d) => d.id === intId);
  }

  @computed
  get length() {
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

import { action, computed, observable } from 'mobx';

export default class Collection {
  @observable collection = [];

  @action
  clear() {
    this.collection = [];
  }

  contains(el) {
    return this.collection.indexOf(el) >= 0;
  }

  containsById(id) {
    return this.findById(id) >= 0;
  }

  find(callback) {
    return this.collection.find(callback);
  }

  @computed
  get first() {
    if (this.length > 0) {
      return this.collection[0];
    }
    return null;
  }

  findById(id) {
    let intId = parseInt(id, 10);

    // If not reliably convert to int
    if (isNaN(intId) || intId + '' !== id) {
      return this.collection.find((el) => el.id === id);
    }

    return this.collection.find((el) => el.id === intId);
  }

  findIndex(callback) {
    return this.collection.findIndex(callback);
  }

  findIndexById(id) {
    return this.findIndex((el) => el.id === id);
  }

  @action
  forEach(callback) {
    this.collection.forEach((el) => {
      callback(el);
    });
  }

  @computed
  get isEmpty() {
    return this.collection.length === 0;
  }

  @computed
  get length() {
    return this.collection.length;
  }

  map(callback) {
    return this.collection.map(callback);
  }

  @action
  push(element) {
    this.collection.push(element);
  }

  @action
  pushAll(elements) {
    (elements || []).forEach((el) => this.push(el));
  }

  @action
  remove(item) {
    const index = this.collection.indexOf(item);
    if (index >= 0) {
      this.collection.splice(index, 1);
    }
  }

  @action
  removeById(id) {
    this.removeByIds([id]);
  }

  @action
  removeByIds(idsToRemove) {
    const newCollection = [];
    this.collection.forEach((el) => {
      if (idsToRemove.indexOf(el.id) < 0) {
        newCollection.push(el);
      }
    });
    this.collection = newCollection;
  }
}

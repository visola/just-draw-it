import { action, observable } from 'mobx';

import tools from '../tools';

export default class Tools {
  @observable all = [];
  @observable selectedTool;

  @action
  loadTools(drawables, selection) {
    tools.forEach((toolClass) => {
      this.all.push(new toolClass(drawables, selection));
    });
    this.selectedTool = this.all[0];
  }

  @action
  select(tool) {
    this.selectedTool = tool;
  }
}

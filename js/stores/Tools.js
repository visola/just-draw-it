import { action, observable } from 'mobx';

import tools from '../tools';

export default class Tools {
  @observable all = [];
  @observable selectedTool;

  @action
  loadTools(drawables, selection) {
    tools.forEach((toolClass) => {
      const toolInstance = new toolClass(drawables, selection);

      toolInstance.on('done', () => {
        this.selectedTool = this.all[0];
      });

      this.all.push(toolInstance);
    });

    this.selectedTool = this.all[0];
  }

  @action
  select(tool) {
    this.selectedTool = tool;
  }
}

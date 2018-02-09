import { action, observable } from 'mobx';

import tools from '../tools';

export default class Tools {
  @observable all = [];
  @observable selectedTool;

  @action
  loadTools(drawables, drawingProperties, selection) {
    tools.forEach((ToolClass) => {
      const toolInstance = new ToolClass(drawables, drawingProperties, selection);

      toolInstance.on('done', () => {
        [this.selectedTool] = this.all;
      });

      this.all.push(toolInstance);
    });

    [this.selectedTool] = this.all;
  }

  @action
  select(tool) {
    this.selectedTool = tool;
  }
}

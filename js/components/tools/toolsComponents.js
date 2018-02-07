import RectToolComponent from './RectToolComponent';
import SelectionToolComponent from './SelectionToolComponent';

import RectTool from '../../tools/RectTool';
import SelectionTool from '../../tools/SelectionTool';

export default {
  getComponentForTool(tool) {
    if (tool instanceof RectTool) {
      return RectToolComponent;
    }
    if (tool instanceof SelectionTool) {
      return SelectionToolComponent;
    }
  }
}

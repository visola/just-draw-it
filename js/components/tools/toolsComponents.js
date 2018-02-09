import RectToolComponent from './RectToolComponent';
import SelectionToolComponent from './SelectionToolComponent';
import StrokeWidthToolComponent from './StrokeWidthToolComponent';

import RectTool from '../../tools/RectTool';
import SelectionTool from '../../tools/SelectionTool';
import StrokeWidthTool from '../../tools/StrokeWidthTool';

export default {
  getComponentForTool(tool) {
    if (tool instanceof RectTool) {
      return RectToolComponent;
    }
    if (tool instanceof SelectionTool) {
      return SelectionToolComponent;
    }
    if (tool instanceof StrokeWidthTool) {
      return StrokeWidthToolComponent;
    }
  }
}

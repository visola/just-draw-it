import RectToolComponent from './RectToolComponent';
import MoveResizeSelectToolComponent from './MoveResizeSelectToolComponent';
import StrokeWidthToolComponent from './StrokeWidthToolComponent';

import RectTool from '../../tools/RectTool';
import MoveResizeSelectTool from '../../tools/MoveResizeSelectTool';
import StrokeWidthTool from '../../tools/StrokeWidthTool';

export default {
  getComponentForTool(tool) {
    if (tool instanceof RectTool) {
      return RectToolComponent;
    }
    if (tool instanceof MoveResizeSelectTool) {
      return MoveResizeSelectToolComponent;
    }
    if (tool instanceof StrokeWidthTool) {
      return StrokeWidthToolComponent;
    }
  }
}

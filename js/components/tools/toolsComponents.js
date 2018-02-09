import ColorPickerToolComponent from './ColorPickerToolComponent';
import MoveResizeSelectToolComponent from './MoveResizeSelectToolComponent';
import RectToolComponent from './RectToolComponent';
import StrokeWidthToolComponent from './StrokeWidthToolComponent';

import ColorPickerTool from '../../tools/ColorPickerTool';
import MoveResizeSelectTool from '../../tools/MoveResizeSelectTool';
import RectTool from '../../tools/RectTool';
import StrokeWidthTool from '../../tools/StrokeWidthTool';

export default {
  getComponentForTool(tool) {
    if (tool instanceof ColorPickerTool) {
      return ColorPickerToolComponent;
    }
    if (tool instanceof MoveResizeSelectTool) {
      return MoveResizeSelectToolComponent;
    }
    if (tool instanceof RectTool) {
      return RectToolComponent;
    }
    if (tool instanceof StrokeWidthTool) {
      return StrokeWidthToolComponent;
    }

    throw new Error(`${tool} not registered`);
  },
};

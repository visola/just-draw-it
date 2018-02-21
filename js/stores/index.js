import Drawables from './Drawables';
import DrawingProperties from './DrawingProperties';
import Selection from './Selection';
import Tools from './Tools';

const drawables = new Drawables();
const drawingProperties = new DrawingProperties();

const selection = new Selection(drawables);

const tools = new Tools(drawables, drawingProperties, selection);

export default {
  drawables,
  drawingProperties,
  selection,
  tools,
};

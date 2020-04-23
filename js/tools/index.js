import menuService from '../services/menu.js';
import toolsService from '../services/tools.js'

import ellipseTool from './ellipse.js';
import rectangleTool from './rectangle.js';
import selectTransformTool from './selectTransform.js';

toolsService.register(ellipseTool);
toolsService.register(rectangleTool);
toolsService.register(selectTransformTool);

const menuItems = [
  {
    action: selectTransformTool.name,
    icon: 'icons/menu/select.svg',
    label: 'Selection',
  },
  {
    action: rectangleTool.name,
    icon: 'icons/menu/rectangle.svg',
    label: 'Rectangle',
  },
  {
    action: ellipseTool.name,
    icon: 'icons/menu/ellipse.svg',
    label: 'Ellipse',
  },
];

menuService.initialize(menuItems);

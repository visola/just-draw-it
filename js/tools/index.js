define([
  'services/menu', 'services/tools', 'tools/ellipse', 'tools/rectangle', 'tools/selectTransform',
], function(menuService, toolsService, ellipseTool, rectangleTool, selectTransformTool) {
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
});

define([
  'document', 'services/canvas', 'services/drawingProperties', 'services/selections',
], function(document, canvasService, drawingProperties, selectionsService) {
  let ellipse;
  let initialX;
  let initialY;

  function onMouseDown(event) {
    const boundingRect = canvasService.element.getBoundingClientRect();
    const {left, top} = boundingRect;

    initialX = event.clientX;
    initialY = event.clientY;

    ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse.setAttribute('rx', '0');
    ellipse.setAttribute('ry', '0');
    ellipse.setAttribute('cx', initialX - left);
    ellipse.setAttribute('cy', initialY - top);

    ellipse.setAttribute('fill', drawingProperties.fillColor);
    ellipse.setAttribute('stroke', drawingProperties.strokeColor);
    ellipse.setAttribute('stroke-width', 1);

    canvasService.addElement(ellipse);
    selectionsService.setSelection(ellipse);
  }

  function onMouseDrag(event) {
    let newWidth = event.clientX - initialX;
    if (newWidth < 0) {
      newWidth = -1 * newWidth;
    }

    let newHeight = event.clientY - initialY;
    if (newHeight < 0) {
      newHeight = -1 * newHeight;
    }

    ellipse.setAttribute('ry', newHeight);
    ellipse.setAttribute('rx', newWidth);
  }

  return {
    get name() {
      return 'ellipse';
    },
    onMouseDown,
    onMouseDrag,
  };
});

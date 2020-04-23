define([
  'document', 'services/canvas', 'services/drawingProperties', 'services/selections',
], function(document, canvasService, drawingPropertiesService, selectionsService) {
  let rect;
  let initialX;
  let initialY;
  let relativeX;
  let relativeY;

  function onMouseDown(event) {
    const boundingRect = canvasService.element.getBoundingClientRect();
    const {left, top} = boundingRect;

    initialX = event.clientX;
    initialY = event.clientY;

    relativeX = initialX - left;
    relativeY = initialY - top;

    rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('height', '0');
    rect.setAttribute('width', '0');
    rect.setAttribute('x', relativeX);
    rect.setAttribute('y', relativeY);

    rect.setAttribute('fill', drawingPropertiesService.fillColor);
    rect.setAttribute('stroke', drawingPropertiesService.strokeColor);
    rect.setAttribute('stroke-width', 1);

    canvasService.addElement(rect);
    selectionsService.setSelection(rect);
  }

  function onMouseDrag(event) {
    const amountX = event.clientX - initialX;
    const amountY = event.clientY - initialY;

    if (amountX < 0) {
      rect.setAttribute('x', relativeX + amountX);
      rect.setAttribute('width', -amountX);
    } else {
      rect.setAttribute('width', amountX);
    }

    if (amountY < 0) {
      rect.setAttribute('y', relativeY + amountY);
      rect.setAttribute('height', -amountY);
    } else {
      rect.setAttribute('height', amountY);
    }
  }

  return {
    get name() {
      return 'rectangle';
    },
    onMouseDown,
    onMouseDrag,
  };
});

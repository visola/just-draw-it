(function (canvas, drawingProperties, tools) {
  let rect;
  let initialX, initialY;
  let relativeX, relativeY;

  let boundingRect = canvas.element.getBoundingClientRect();
  let { left, top } = boundingRect;

  function onMouseDown(event) {
    initialX = event.clientX;
    initialY = event.clientY;

    relativeX = initialX - left;
    relativeY = initialY - top;

    rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('height', '0');
    rect.setAttribute('width', '0');
    rect.setAttribute('x', relativeX);
    rect.setAttribute('y', relativeY);

    rect.setAttribute('fill', drawingProperties.fillColor);
    rect.setAttribute('stroke', drawingProperties.strokeColor);
    rect.setAttribute('strokeWidth', 1);

    canvas.addElement(rect);
  }

  function onMouseDrag(event) {
    let amountX = event.clientX - initialX;
    let amountY = event.clientY - initialY;

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

  tools.register('rectangle', {
    onMouseDown,
    onMouseDrag,
  });
})(canvas, drawingProperties, tools);

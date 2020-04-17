(function (actions, canvas) {
  let ellipse;
  let initialX, initialY;

  function onMouseDown(event) {
    const boundingRect = event.target.getBoundingClientRect();
    const { left, top } = boundingRect;

    initialX = event.clientX;
    initialY = event.clientY;

    ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse.setAttribute('rx', '0');
    ellipse.setAttribute('ry', '0');
    ellipse.setAttribute('cx', initialX - left);
    ellipse.setAttribute('cy', initialY - top);
    ellipse.setAttribute('style', 'fill:black; stroke:black; stroke-width:2;');

    canvas.addElement(ellipse);
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

  actions.register('ellipse', {
    onMouseDown,
    onMouseDrag,
  });
})(actions, canvas);

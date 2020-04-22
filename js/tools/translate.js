/* exported translateTool */
const translateTool = (function () {
  function fetchPositions(elements) {
    return elements.map((el) => {
      switch (el.nodeName) {
        case 'ellipse':
          return {
            x: parseInt(el.getAttribute('cx'), 10),
            y: parseInt(el.getAttribute('cy'), 10),
          };
        case 'rect':
          return {
            x: parseInt(el.getAttribute('x'), 10),
            y: parseInt(el.getAttribute('y'), 10),
          };
      }
    });
  }

  function move(elements, initialPositions, amountX, amountY) {
    elements.forEach((el, index) => {
      const initialPosition = initialPositions[index];
      switch (el.nodeName) {
        case 'ellipse':
          el.setAttribute('cx', initialPosition.x + amountX);
          el.setAttribute('cy', initialPosition.y + amountY);
          break;
        case 'rect':
          el.setAttribute('x', initialPosition.x + amountX);
          el.setAttribute('y', initialPosition.y + amountY);
          break;
      }
    });
  }

  return {
    fetchPositions,
    move,
  };
})();

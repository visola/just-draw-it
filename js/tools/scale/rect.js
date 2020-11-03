function fetchCurrentState(element) {
  return {
    x: parseInt(element.getAttribute('x'), 10),
    y: parseInt(element.getAttribute('y'), 10),
    height: parseInt(element.getAttribute('height'), 10),
    width: parseInt(element.getAttribute('width'), 10),
  };
}

function scale(element, initialState, direction, amountX, amountY) {
  if (direction.indexOf('s') >= 0) {
    element.setAttribute('height', initialState.height + amountY);
  }
  if (direction.indexOf('n') >= 0) {
    element.setAttribute('y', initialState.y + amountY);
    element.setAttribute('height', initialState.height - amountY);
  }
  if (direction.indexOf('e') >= 0) {
    element.setAttribute('width', initialState.width + amountX);
  }
  if (direction.indexOf('w') >= 0) {
    element.setAttribute('x', initialState.x + amountX);
    element.setAttribute('width', initialState.width - amountX);
  }
}

export default {
  fetchCurrentState,
  scale,
};

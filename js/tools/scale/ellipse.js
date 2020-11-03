function fetchCurrentState(element) {
  return {
    cx: parseInt(element.getAttribute('cx'), 10),
    cy: parseInt(element.getAttribute('cy'), 10),
    rx: parseInt(element.getAttribute('rx'), 10),
    ry: parseInt(element.getAttribute('ry'), 10),
  };
}

function scale(element, initialState, direction, amountX, amountY) {
  if (direction.indexOf('s') >= 0) {
    element.setAttribute('cy', initialState.cy + amountY / 2);
    element.setAttribute('ry', initialState.ry + amountY / 2);
  }
  if (direction.indexOf('n') >= 0) {
    element.setAttribute('cy', initialState.cy + amountY / 2);
    element.setAttribute('ry', initialState.ry - amountY / 2);
  }
  if (direction.indexOf('e') >= 0) {
    element.setAttribute('cx', initialState.cx + amountX / 2);
    element.setAttribute('rx', initialState.rx + amountX / 2);
  }
  if (direction.indexOf('w') >= 0) {
    element.setAttribute('cx', initialState.cx + amountX / 2);
    element.setAttribute('rx', initialState.rx - amountX / 2);
  }
}

export default {
  fetchCurrentState,
  scale,
};

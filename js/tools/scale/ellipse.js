function fetchCurrentState(element) {
  return {
    cx: parseInt(element.getAttribute('cx'), 10),
    cy: parseInt(element.getAttribute('cy'), 10),
    rx: parseInt(element.getAttribute('rx'), 10),
    ry: parseInt(element.getAttribute('ry'), 10),
  };
}

function scale(element, initialState, direction, amountX, amountY) {
  let {cx, cy, rx, ry} = initialState;

  cy += amountY / 2;
  cx += amountX / 2;

  if (direction.indexOf('s') >= 0) {
    ry += amountY / 2;
  }
  if (direction.indexOf('n') >= 0) {
    ry -= amountY / 2;
  }
  if (direction.indexOf('e') >= 0) {
    rx += amountX / 2;
  }
  if (direction.indexOf('w') >= 0) {
    rx -= amountX / 2;
  }

  element.setAttribute('cx', cx);
  element.setAttribute('rx', rx);
  element.setAttribute('cy', cy);
  element.setAttribute('ry', ry);
}

export default {
  fetchCurrentState,
  scale,
};

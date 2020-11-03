import scaleTools from './scale/index.js';

function fetchCurrentStates(elements) {
  return elements.map((el) => scaleTools[el.nodeName].fetchCurrentState(el));
}

function scale(elements, initialStates, direction, amountX, amountY) {
  elements.forEach((el, index) => {
    const initialState = initialStates[index];
    scaleTools[el.nodeName].scale(el, initialState, direction, amountX, amountY);
  });
}

export default {
  fetchCurrentStates,
  scale,
};

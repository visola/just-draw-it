import translate from './translate/index.js';

function fetchPositions(elements) {
  return elements.map((el) => translate[el.nodeName].fetchPosition(el));
}

function move(elements, initialPositions, amountX, amountY) {
  elements.forEach((el, index) => {
    const initialPosition = initialPositions[index];
    translate[el.nodeName].move(el, initialPosition, amountX, amountY);
  });
}

export default {
  fetchPositions,
  move,
};

function fetchPosition(element) {
    return {
        x: parseInt(element.getAttribute('cx'), 10),
        y: parseInt(element.getAttribute('cy'), 10),
    };
}

function move(element, initialPosition, amountX, amountY) {
    element.setAttribute('cx', initialPosition.x + amountX);
    element.setAttribute('cy', initialPosition.y + amountY);
}

export default {
    fetchPosition,
    move,
}

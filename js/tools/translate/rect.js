function fetchPosition(element) {
    return {
        x: parseInt(element.getAttribute('x'), 10),
        y: parseInt(element.getAttribute('y'), 10),
    };
}

function move(element, initialPosition, amountX, amountY) {
    element.setAttribute('x', initialPosition.x + amountX);
    element.setAttribute('y', initialPosition.y + amountY);
}

export default {
    fetchPosition,
    move,
}
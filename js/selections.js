/* exported selections */
const selections = (function(canvas) {
  const canvasElement = canvas.element;
  const { left, top } = canvas.element.getBoundingClientRect();
  let selections = [];

  let controlPoints = [];
  let previousBoundaries = null;
  let selectionRect = null;

  function calculateSelectionBoundaries() {
    if (selections.length == 0) {
      return null;
    }

    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = 0;
    let maxY = 0;

    selections.forEach((el) => {
      const boundingRect = el.getBoundingClientRect();
      const halfStrokeWidth = (parseInt(el.getAttribute('stroke-width'), 10) || 0) / 2;
      if (minX > boundingRect.x) {
        minX = boundingRect.x - halfStrokeWidth;
      }
      if (minY > boundingRect.y) {
        minY = boundingRect.y - halfStrokeWidth;
      }
      if (maxX < boundingRect.x + boundingRect.width) {
        maxX = boundingRect.x + boundingRect.width + halfStrokeWidth;
      }
      if (maxY < boundingRect.y + boundingRect.height) {
        maxY = boundingRect.y + boundingRect.height + halfStrokeWidth;
      }
    });

    return {
      x: minX - 1 - left,
      y: minY - 1 - top,
      height: maxY - minY + 1,
      width: maxX - minX + 1,
    };
  }

  function clearSelection() {
    selections = [];
  }

  function drawSelectionEnvelope() {
    const bounderies = calculateSelectionBoundaries();
    if (bounderies == null) {
      removeControlElements();
      return;
    }

    if (!selectionRect) {
      selectionRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      selectionRect.setAttribute('fill', 'transparent');
      selectionRect.setAttribute('stroke', '#000');
      selectionRect.setAttribute('stroke-dasharray', '5,5');
      selectionRect.setAttribute('stroke-width', '1');
    }
    selectionRect.setAttribute('x', bounderies.x);
    selectionRect.setAttribute('y', bounderies.y);
    selectionRect.setAttribute('height', bounderies.height);
    selectionRect.setAttribute('width', bounderies.width);

    canvasElement.appendChild(selectionRect);
  }

  function removeControlElements() {
    controlPoints.forEach((p) => {
      canvasElement.removeChild(p);
    });
    controlPoints = [];

    if (selectionRect) {
      canvasElement.removeChild(selectionRect);
    }
    selectionRect = null;
  }

  function setSelection(element) {
    clearSelection();
    selections.push(element);
    drawSelectionEnvelope();
  }

  canvasElement.addEventListener('mousemove', () => {
    drawSelectionEnvelope();
  });

  return {
    setSelection,
  };
})(canvas);

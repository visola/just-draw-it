import document from '../document.js';

import canvasService from './canvas.js';


const CONTROL_POINT_SIZE = 10;
const canvasElement = canvasService.element;
const {left, top} = canvasService.element.getBoundingClientRect();
let selections = [];

let controlPoints = [];
let selectionRect = null;

function addToSelection(element) {
  selections.push(element);
  drawSelectionControls();
}

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
    x: minX - 2 - left,
    y: minY - 2 - top,
    height: maxY - minY + 2,
    width: maxX - minX + 2,
  };
}

function clearSelection() {
  selections = [];
}

function drawControlPoints(boundaries) {
  const newPositions = [
    {name: 'nw', x: boundaries.x - CONTROL_POINT_SIZE, y: boundaries.y - CONTROL_POINT_SIZE},
    {name: 'ne', x: boundaries.x + boundaries.width, y: boundaries.y - CONTROL_POINT_SIZE},
    {name: 'sw', x: boundaries.x - CONTROL_POINT_SIZE, y: boundaries.y + boundaries.height},
    {name: 'se', x: boundaries.x + boundaries.width, y: boundaries.y + boundaries.height},
  ];

  if (controlPoints.length == 0) {
    for (let i = 0; i < newPositions.length; i++) {
      const controlPoint = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      controlPoint.setAttribute('fill', 'black');
      controlPoint.setAttribute('stroke-width', '0');
      controlPoint.setAttribute('height', CONTROL_POINT_SIZE);
      controlPoint.setAttribute('width', CONTROL_POINT_SIZE);
      controlPoint.dataset.control = newPositions[i].name;
      canvasElement.appendChild(controlPoint);
      controlPoints[i] = controlPoint;
    }
  }

  newPositions.forEach((point, index) => {
    controlPoints[index].setAttribute('x', point.x);
    controlPoints[index].setAttribute('y', point.y);
  });
}

function drawSelectionBoundaries(boundaries) {
  if (!selectionRect) {
    selectionRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    selectionRect.dataset.boundary = 'true';
    selectionRect.setAttribute('fill', 'transparent');
    selectionRect.setAttribute('stroke', '#000');
    selectionRect.setAttribute('stroke-dasharray', '5,5');
    selectionRect.setAttribute('stroke-width', '1');
    canvasElement.appendChild(selectionRect);
  }

  selectionRect.setAttribute('x', boundaries.x);
  selectionRect.setAttribute('y', boundaries.y);
  selectionRect.setAttribute('height', boundaries.height);
  selectionRect.setAttribute('width', boundaries.width);
}

function drawSelectionControls() {
  const bounderies = calculateSelectionBoundaries();
  if (bounderies == null) {
    removeControlElements();
    return;
  }

  drawSelectionBoundaries(bounderies);
  drawControlPoints(bounderies);
}

function isSelected(...elements) {
  const intersection = new Set();
  for (let i = 0; i < selections.length; i++) {
    for (let j = 0; j < elements.length; j++) {
      if (selections[i] == elements[j]) {
        intersection.add(elements[j]);
      }
    }
  }
  return intersection.size;
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
  drawSelectionControls();
}

canvasElement.addEventListener('mousemove', drawSelectionControls);
canvasElement.addEventListener('mousedown', drawSelectionControls);
canvasElement.addEventListener('mouseup', drawSelectionControls);

export default {
  addToSelection,
  clearSelection,
  get selections() {
    return selections;
  },
  isSelected,
  setSelection,
};

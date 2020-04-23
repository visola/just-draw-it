import canvasService from '../services/canvas.js';
import selectionsService from '../services/selections.js';

import translateTool from './translate.js';

let draggingSelection = false;
let initialClientX;
let initialClientY;
let recordedInitialPositions;

function onMouseDown(event) {
  draggingSelection = false;

  const elementsUnderMouse = canvasService.getClickable(event.clientX, event.clientY)
      .filter((el) => el.dataset.boundary == null);

  const controlUnderMouse = elementsUnderMouse.find((el) => el.dataset.control);

  initialClientX = event.clientX;
  initialClientY = event.clientY;

  if (controlUnderMouse) {
    // TODO - Implement transform
    console.log('Mouse down at control point', controlUnderMouse);
  } else if (selectionsService.isSelected(...elementsUnderMouse)) {
    draggingSelection = true;
    recordedInitialPositions = translateTool.fetchPositions(selectionsService.selections);
  } else {
    if (elementsUnderMouse.length == 0) {
      selectionsService.clearSelection();
      return;
    }

    if (event.getModifierState('Shift')) {
      selectionsService.addToSelection(elementsUnderMouse[0]);
    } else {
      selectionsService.setSelection(elementsUnderMouse[0]);
    }
    recordedInitialPositions = translateTool.fetchPositions(selectionsService.selections);
    draggingSelection = true;
  }
}

function onMouseDrag(event) {
  if (draggingSelection) {
    translateTool.move(
        selectionsService.selections,
        recordedInitialPositions,
        event.clientX - initialClientX,
        event.clientY - initialClientY,
    );
  }
}

export default {
  get name() {
    return 'selectTransform';
  },
  onMouseDown,
  onMouseDrag,
};

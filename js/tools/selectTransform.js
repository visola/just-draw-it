import canvasService from '../services/canvas.js';
import selectionsService from '../services/selections.js';

import scaleTool from './scale.js';
import selectTool from './select.js';
import translateTool from './translate.js';

let draggingSelection = false;
let draggingControl = null;
let initialClientX;
let initialClientY;
let recordedInitialPositions;
let recordedInitialStates;

function onMouseDown(event) {
  draggingSelection = false;

  const elementsUnderMouse = canvasService.getClickable(event.clientX, event.clientY)
      .filter((el) => el.dataset.boundary == null);

  const controlUnderMouse = elementsUnderMouse.find((el) => el.dataset.control);

  initialClientX = event.clientX;
  initialClientY = event.clientY;

  draggingSelection = false;
  draggingControl = null;

  if (controlUnderMouse) {
    recordedInitialStates = scaleTool.fetchCurrentStates(selectionsService.selections);
    draggingControl = controlUnderMouse;
  } else {
    selectTool.onMouseDown(event, elementsUnderMouse);
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

  if (draggingControl) {
    scaleTool.scale(
        selectionsService.selections,
        recordedInitialStates,
        draggingControl.dataset.control,
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

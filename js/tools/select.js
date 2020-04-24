import selectionsService from '../services/selections.js';

function onMouseDown(elementsUnderMouse) {
  const toSelect = elementsUnderMouse[0];

  if (selectionsService.isSelected(toSelect)) {
    return;
  }

  if (elementsUnderMouse.length == 0) {
    selectionsService.clearSelection();
    return;
  }

  if (event.getModifierState('Shift')) {
    selectionsService.addToSelection(toSelect);
  } else {
    selectionsService.setSelection(toSelect);
  }
}

export default {
  onMouseDown,
};
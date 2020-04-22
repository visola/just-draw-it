(function (canvas, selections, tools, translateTool) {
  let draggingSelection = false;
  let initialClientX, initialClientY;
  let recordedInitialPositions;

  function onMouseDown(event) {
    draggingSelection = false;

    const elementsUnderMouse = canvas.getClickable(event.clientX, event.clientY)
      .filter((el) => el.dataset.boundary == null);

    const controlUnderMouse = elementsUnderMouse.find((el) => el.dataset.control);

    initialClientX = event.clientX;
    initialClientY = event.clientY;

    if (controlUnderMouse) {
      // TODO - Implement transform
      console.log('Mouse down at control point', controlUnderMouse);
    } else if (selections.isSelected(...elementsUnderMouse)) {
      draggingSelection = true;
      recordedInitialPositions = translateTool.fetchPositions(selections.selections);
    } else {
      if (elementsUnderMouse.length == 0) {
        selections.clearSelection();
        return;
      }

      if (event.getModifierState('Shift')) {
        selections.addToSelection(elementsUnderMouse[0]);
      } else {
        selections.setSelection(elementsUnderMouse[0]);
      }
      recordedInitialPositions = translateTool.fetchPositions(selections.selections);
      draggingSelection = true;
    }
  }

  function onMouseDrag(event) {
    if (draggingSelection) {
      translateTool.move(selections.selections, recordedInitialPositions, event.clientX - initialClientX, event.clientY - initialClientY);
    }
  }

  tools.register('selectTransform', {
    onMouseDown,
    onMouseDrag,
  });
})(canvas, selections, tools, translateTool);

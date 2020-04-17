/* exported actions */
const actions = (function(canvas) {
  const actionsByName = {};
  const canvasEl = canvas.element;

  let activeAction;
  let mouseIsDown = false;

  function mouseDownHandler(event) {
    mouseIsDown = true;
    if (activeAction && activeAction.onMouseDown) {
      activeAction.onMouseDown(event);
    }
  }

  function mouseUpHandler() {
    if (activeAction && activeAction.onMouseUp) {
      activeAction.onMouseUp(event);
    }
    mouseIsDown = false;
  }

  function mouseMoveHandler() {
    if (mouseIsDown) {
      if (activeAction && activeAction.onMouseDrag) {
        activeAction.onMouseDrag(event);
      }
      return;
    }


    if (activeAction && activeAction.onMouseMove) {
      activeAction.onMouseMove(event);
    }
  }

  canvasEl.addEventListener('mousedown', mouseDownHandler);
  canvasEl.addEventListener('mouseup', mouseUpHandler);
  canvasEl.addEventListener('mousemove', mouseMoveHandler);

  return {
    activate(action) {
      if (!actionsByName[action]) {
        throw new Error(`No action with name: "${action}"`);
      }

      activeAction = actionsByName[action];
    },

    register(name, action) {
      actionsByName[name] = action;
    },
  };
})(canvas);

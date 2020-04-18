/* exported tools */
const tools = (function(canvas) {
  const toolsByName = {};
  const canvasEl = canvas.element;

  let activeTool;
  let mouseIsDown = false;

  function mouseDownHandler(event) {
    mouseIsDown = true;
    if (activeTool && activeTool.onMouseDown) {
      activeTool.onMouseDown(event);
    }
  }

  function mouseMoveHandler() {
    if (mouseIsDown) {
      if (activeTool && activeTool.onMouseDrag) {
        activeTool.onMouseDrag(event);
      }
      return;
    }


    if (activeTool && activeTool.onMouseMove) {
      activeTool.onMouseMove(event);
    }
  }

  function mouseUpHandler() {
    if (activeTool && activeTool.onMouseUp) {
      activeTool.onMouseUp(event);
    }
    mouseIsDown = false;
  }

  canvasEl.addEventListener('mousedown', mouseDownHandler);
  canvasEl.addEventListener('mousemove', mouseMoveHandler);
  canvasEl.addEventListener('mouseup', mouseUpHandler);

  return {
    activate(tool) {
      if (!toolsByName[tool]) {
        throw new Error(`No tool with name: "${tool}"`);
      }

      const previousActive = activeTool;
      activeTool = toolsByName[tool];
      if (activeTool.activate) {
        activeTool.activate(previousActive);
      }
    },

    register(name, tool) {
      toolsByName[name] = tool;
    },
  };
})(canvas);

/* exported tools */
const tools = (function(canvas) {
  const listeners = [];
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
    activate(toolName) {
      if (!toolsByName[toolName]) {
        throw new Error(`No tool with name: "${toolName}"`);
      }

      const newTool = toolsByName[toolName];
      if (newTool == activeTool) {
        return;
      }

      const previousActive = activeTool;
      activeTool = newTool;
      listeners.forEach((l) => {
        l(toolName);
      });
      if (activeTool.activate) {
        activeTool.activate(previousActive);
      }
    },

    register(name, tool) {
      toolsByName[name] = tool;
    },

    registerListener(l) {
      listeners.push(l);
    },
  };
})(canvas);

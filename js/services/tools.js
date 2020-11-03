import canvasService from './canvas.js';

const listeners = [];
const toolsByName = {};
const canvasEl = canvasService.element;

let activeTool;
let mouseIsDown = false;

function activate(toolName) {
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
}

function mouseDownHandler(event) {
  mouseIsDown = true;
  if (activeTool && activeTool.onMouseDown) {
    activeTool.onMouseDown(event);
  }
}

function mouseMoveHandler(event) {
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

function register(tool) {
  toolsByName[tool.name] = tool;
};

function registerListener(l) {
  listeners.push(l);
};

canvasEl.addEventListener('mousedown', mouseDownHandler);
canvasEl.addEventListener('mousemove', mouseMoveHandler);
canvasEl.addEventListener('mouseup', mouseUpHandler);

export default {
  activate,
  register,
  registerListener,
};

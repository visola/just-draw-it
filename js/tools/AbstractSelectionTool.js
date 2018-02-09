import AbstractTool from "./AbstractTool";

export default class AbstractSelectionTool extends AbstractTool {
  isActive() {
    throw new Error("Not implemented");
  }
}

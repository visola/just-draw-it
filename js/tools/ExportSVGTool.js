import { observable } from 'mobx';

import AbstractTool from './AbstractTool';

const SVG_MIME_TYPE = 'image/svg+xml';

export default class ExportSVGTool extends AbstractTool {
  @observable svg = null;

  get url() {
    const bb = new Blob([this.svg], { type: SVG_MIME_TYPE });
    return window.URL.createObjectURL(bb);
  }

  isActive() {
    return this.selection.empty;
  }

  onDownload() {
    this.emit('done');
  }

  onSVGChange(svg) {
    this.svg = svg;
  }
}

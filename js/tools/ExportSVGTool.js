import classnames from 'classnames';
import { observable } from 'mobx';
import React from 'react';

import AbstractTool from './AbstractTool';

const SVG_MIME_TYPE = 'image/svg+xml';

export default class ExportSVGTool extends AbstractTool {
  @observable svg = null;

  get url() {
    const bb = new Blob([this.svg], { type: SVG_MIME_TYPE });
    return window.URL.createObjectURL(bb);
  }

  handleClick(e) {
    if (!this.isActive()) {
      e.preventDefault();
    }
    this.emit('done');
  }

  isActive() {
    return this.selection.isEmpty;
  }

  onSVGChange(svg) {
    this.svg = svg;
  }

  render(selected) {
    return <a
      key="export-svg-tool"
      className={classnames({ btn: true, 'btn-default': true, active: selected })}
      disabled={!this.isActive()}
      download="drawing.svg"
      onClick={this.handleClick.bind(this)}
      href={this.url}
    >
      <span className="icon glyphicon glyphicon-save"></span>
    </a>;
  }
}

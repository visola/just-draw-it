import React from 'react';

import Canvas from './Canvas';

const SVG_MIME_TYPE = 'image/svg+xml';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rects: [],
      svg: null,
    };
  }

  handleAddRect() {
    const rects = this.state.rects;
    const index = rects.length + 1;
    rects.push({
      height: 100,
      id: Date.now(),
      width: 100,
      x: index * 10,
      y: index * 10,
    });
    this.setState({ rects });
  }

  handleRectDrop(rect, {x, y}) {
    const loadedRect = this.state.rects.find((r) => r.id == rect.id);
    loadedRect.x = x;
    loadedRect.y = y;
    this.setState({ rects: this.state.rects });
  }

  handleSvgContentChanged(svgContent) {
    const svg = `<svg>${svgContent}</svg>`;
    if (this.state.svg == svg) {
      return;
    }
    this.setState({ svg });
  }

  render() {
    return (
      <div className="toolbar">
        <button onClick={this.handleAddRect.bind(this)}>Add Rect</button>
        {this.renderDownloadLink()}
        <Canvas
          onRectDrop={this.handleRectDrop.bind(this)}
          onSvgContentChange={this.handleSvgContentChanged.bind(this)}
          rects={this.state.rects} />
      </div>
    );
  }

  renderDownloadLink() {
    if (this.state.svg == null) {
      return null;
    }

    const bb = new Blob([this.state.svg], {type: SVG_MIME_TYPE});
    return <a download="drawing.svg" href={window.URL.createObjectURL(bb)}>Download</a>;
  }
}

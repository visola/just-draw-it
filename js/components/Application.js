import { observer } from 'mobx-react';
import React from 'react';

import Canvas from './Canvas';
import ColorPicker from './ColorPicker';
import Drawables from '../stores/Drawables';
import Rectangle from '../models/Rectangle';
import RectIcon from './icons/RectIcon';
import StrokeWidthIcon from './icons/StrokeWidthIcon';

import SelectionTool from '../models/tools/SelectionTool';

const SVG_MIME_TYPE = 'image/svg+xml';

@observer
export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawables: new Drawables(),
      selection: [],
      svg: null,
      selectedTool: new SelectionTool(),
    };
  }

  handleAddRect() {
    const { drawables } = this.state;
    const index = drawables.length + 1;
    const rect = new Rectangle();
    rect.x = index * 10;
    rect.y = index * 10;
    rect.height = 100;
    rect.width = 100;
    drawables.push(rect);
  }

  handleChangeStrokeWidth() {
    const { selected } = this.state;
    const result = prompt('What stroke width?', selected.strokeWidth);
    if (result && result > 0) {
      selected.strokeWidth = result;
      this.setState({ selected });
    }
  }

  handleDropDrawable(rect, { x, y }) {
    const loadedRect = this.state.drawables.find(rect.id);
    loadedRect.x = x;
    loadedRect.y = y;
  }

  handleDrawableSelected(drawable) {
    this.setState({ selected: drawable });
  }

  handleFillColorChange(newColor) {
    this.state.selected.fill = newColor;
  }

  handleStrokeColorChange(newColor) {
    this.state.selected.stroke = newColor;
  }

  handleSvgContentChanged(svg) {
    if (this.state.svg === svg) {
      return;
    }
    this.setState({ svg });
  }

  render() {
    return (
      <div>
        <div className="toolbar">
          <button className="btn btn-default" onClick={this.handleAddRect.bind(this)}>
            <RectIcon />
          </button>
          {this.renderDownloadLink()}
          {this.renderControlsForSelected()}
        </div>
        <Canvas
          onDrop={this.state.selectedTool.handleDrop}
          onDrag={this.state.selectedTool.handleDrag}
          onMouseDown={this.state.selectedTool.handleMouseDown}
          onSvgContentChange={this.handleSvgContentChanged.bind(this)}
          drawables={this.state.drawables} />
        <div>
          {this.state.selectedTool.selection.map((s) => <span key={s.id}>{s.x},{s.y}</span>)}
        </div>
      </div>
    );
  }

  renderDownloadLink() {
    if (this.state.svg == null) {
      return null;
    }

    const bb = new Blob([this.state.svg], { type: SVG_MIME_TYPE });
    return <a
      className="btn btn-default"
      download="drawing.svg"
      href={window.URL.createObjectURL(bb)}
    >
      <span className="glyphicon glyphicon-download-alt"></span>
    </a>;
  }

  renderControlsForSelected() {
    const { selected } = this.state;
    if (!selected) {
      return null;
    }

    return [
      <ColorPicker key="fill" color={selected.fill} onColorChange={this.handleFillColorChange.bind(this)} />,
      <ColorPicker key="stroke" color={selected.stroke} onColorChange={this.handleStrokeColorChange.bind(this)} />,
      <button key="strokeWidth" className="btn btn-default" onClick={this.handleChangeStrokeWidth.bind(this)}>
        <StrokeWidthIcon />
      </button>,
    ];
  }
}

import classnames from 'classnames';
import { observable } from 'mobx';
import React from 'react';
import { SketchPicker } from 'react-color';

import AbstractTool from './AbstractTool';
import ColorsIcon from '../components/icons/ColorsIcon';

export default class ColorPickerTool extends AbstractTool {
  @observable pickingFill = false;
  @observable pickingStroke = false;

  get fillColor() {
    if (this.selection.empty) {
      return this.drawingProperties.fillColor;
    }
    return this.selection.first.fill;
  }

  get strokeColor() {
    if (this.selection.empty) {
      return this.drawingProperties.strokeColor;
    }
    return this.selection.first.stroke;
  }

  handleBlur() {
    this.pickingFill = false;
    this.pickingStroke = false;
  }

  handleColorChange({ hex }) {
    if (this.pickingFill) {
      this.setFillColor(hex);
    } else {
      this.setStrokeColor(hex);
    }
  }

  handleClickStroke() {
    this.pickingStroke = true;
  }

  handleClickFill() {
    this.pickingFill = true;
  }

  setFillColor(newColor) {
    if (this.selection.empty) {
      this.drawingProperties.fillColor = newColor;
    } else {
      this.selection.forEach((d) => {
        d.fill = newColor;
        return null;
      });
    }
    this.emit('done');
  }

  setStrokeColor(newColor) {
    if (this.selection.empty) {
      this.drawingProperties.strokeColor = newColor;
    } else {
      this.selection.forEach((d) => {
        d.stroke = newColor;
        return null;
      });
    }
    this.emit('done');
  }

  render(selected) {
    const { fillColor, strokeColor } = this;
    return (
      <div key="color-picker-tool">
        <button
          className={classnames({ btn: true, 'btn-default': true, active: selected })}
        >
          <ColorsIcon
            fillColor={fillColor}
            strokeColor={strokeColor}
            onStrokeClick={this.handleClickStroke.bind(this)}
            onFillClick={this.handleClickFill.bind(this)}
          />
        </button>
        {this.renderColorPicker()}
      </div>
    );
  }

  renderColorPicker() {
    const { pickingFill, pickingStroke } = this;
    if (pickingFill || pickingStroke) {
      let color = this.fillColor;
      if (pickingStroke) {
        color = this.strokeColor;
      }
      return <div tabIndex="-1" onBlur={this.handleBlur.bind(this)} ref={(div) => div && div.focus()}>
        <SketchPicker color={color} onChange={this.handleColorChange.bind(this)} />
      </div>;
    }

    return null;
  }
}

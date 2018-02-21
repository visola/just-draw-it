import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import SelectionBox from './SelectionBox';
import ControlPoint from '../models/ControlPoint';

@inject('drawables', 'selection', 'tools')
@observer
export default class Canvas extends React.Component {
  static propTypes = {
    drawables: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
    tools: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.controlPoints = [];
    this.state = {
      dragging: null,
      clientX: null,
      clientY: null,
      svg: null,
    };
  }

  getClickable(x, y) {
    const elements = document.elementsFromPoint(x, y);
    const result = {};

    elements.reverse().forEach((e) => {
      const { id, type } = e.dataset;
      if (type != null && id != null) {
        result[type] = result[type] || [];
        result[type].push(this.getDrawable(id));
      }
    });
    return result;
  }

  getDrawable(id) {
    return this.props.drawables.findById(id) ||
      this.controlPoints.find((c) => c.id === id);
  }

  handleMouseDown(e) {
    const boundingRect = e.target.getBoundingClientRect();
    const { left, top } = boundingRect;

    const clickable = this.getClickable(e.clientX, e.clientY);
    const state = {
      dragging: clickable,
      initialX: e.clientX,
      initialY: e.clientY,
      clientX: left,
      clientY: top,
    };
    this.setState(state);

    this.triggerPositionEvent('onMouseDown', state, e);
  }

  handleMouseMove(e) {
    if (this.state.dragging) {
      this.triggerPositionEvent('onDrag', this.state, e);
    } else {
      this.triggerPositionEvent('onMouseMove', this.state, e);
    }
  }

  handleMouseDrop(e) {
    this.triggerPositionEvent('onDrop', this.state, e);
    this.setState({ dragging: null });
  }

  handleSVGRef(svgEl) {
    if (svgEl) {
      const svg = svgEl.outerHTML;
      if (svg !== this.state.svg) {
        this.setState({ svg });
        this.props.tools.all.forEach((t) => t.onSVGChange(svg));
      }
    }
  }

  render() {
    return (
      <svg
        className="canvas"
        ref={this.handleSVGRef.bind(this)}
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseDrop.bind(this)}
        onMouseLeave={this.handleMouseDrop.bind(this)}
        width="500"
        height="500"
      >
        {this.renderDrawables()}
        {this.renderSelectionBox()}
      </svg>
    );
  }

  renderDrawable(drawable) {
    const Component = drawable.component;
    return <Component key={drawable.id} drawable={drawable} />;
  }

  renderDrawables() {
    return this.props.drawables.map(this.renderDrawable);
  }

  renderSelectionBox() {
    const { boundingRect } = this.props.selection;
    if (boundingRect) {
      const { x, y, height, width } = boundingRect;
      this.controlPoints = [
        new ControlPoint(x, y),
        new ControlPoint(x, y + height),
        new ControlPoint(x + width, y),
        new ControlPoint(x + width, y + height),
      ];

      return [
        <SelectionBox key="selection-box" rect={boundingRect} />,
        ...this.controlPoints.map(this.renderDrawable),
      ];
    } else {
      this.controlPoints = [];
    }
    return null;
  }

  triggerPositionEvent(eventName, state, clickEvent) {
    const { selectedTool } = this.props.tools;
    const {
      clientX, clientY, dragging, initialX, initialY,
    } = state;

    const position = {
      offsetX: clickEvent.clientX - initialX,
      offsetY: clickEvent.clientY - initialY,
      x: clickEvent.clientX - clientX,
      y: clickEvent.clientY - clientY,
      shiftKey: clickEvent.shiftKey,
      metaKey: clickEvent.metaKey,
      ctrlKey: clickEvent.ctrlKey,
      altKey: clickEvent.altKey,
    };

    selectedTool[eventName](position, dragging);
  }
}

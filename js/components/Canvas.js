import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import Clickable from '../models/Clickable';
import ControlPoint from './ControlPoint';
import SelectionBox from './SelectionBox';

@observer
export default class Canvas extends React.Component {
  static propTypes = {
    drawables: PropTypes.object.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onSvgContentChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      dragging: null,
    };
  }

  getClickable(x, y) {
    const elements = document.elementsFromPoint(x, y);
    let result = {
      drawables: [],
    };

    elements.reverse().forEach((e) => {
      const { id, type } = e.dataset;
      switch(type) {
        case 'drawable':
          result.drawables.push(this.props.drawables.find(id));
          break;
        default:
          // Do nothing
      }
    });
    return new Clickable(result);
  }

  getSvgContent(svgElement) {
    if (svgElement == null) {
      return;
    }

    this.props.onSvgContentChange(svgElement.outerHTML);
  }

  handleMouseDown(e) {
    const clickable = this.getClickable(e.clientX, e.clientY);
    const state = {
      dragging: clickable,
      initialX: e.clientX,
      initialY: e.clientY,
    };
    this.setState(state);

    this.triggerPositionEvent('onDragStart', state, e);
  }

  handleMouseMove(e) {
    this.triggerPositionEvent('onDrag', this.state, e);
  }

  handleMouseDrop(e) {
    this.triggerPositionEvent('onDrop', this.state, e);
    this.setState({ dragging: null });
  }

  render() {
    return (
      <svg
        className="canvas"
        xmlns="http://www.w3.org/2000/svg"
        ref={this.getSvgContent.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseDrop.bind(this)}
        onMouseLeave={this.handleMouseDrop.bind(this)}
        width="500"
        height="500"
      >
        {this.renderDrawables()}
      </svg>
    );
  }

  renderDrawables() {
    return this.props.drawables.map((drawable) => {
      const Component = drawable.component;
      return <Component key={drawable.id} drawable={drawable} />
    });
  }

  triggerPositionEvent(eventName, state, clickEvent) {
    const { dragging, initialX, initialY } = state;
    const offsetX = clickEvent.clientX - initialX;
    const offsetY = clickEvent.clientY - initialY;
    this.props[eventName](dragging, offsetX, offsetY);
  }
}

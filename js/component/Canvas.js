import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import Rect from './Rect';
import Rectangle from '../models/Rectangle';

@observer
export default class Canvas extends React.Component {
  static propTypes = {
    onDrop: PropTypes.func.isRequired,
    onSvgContentChange: PropTypes.func.isRequired,
    drawables: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      mouseDownAt: null,
      dragging: null,
      selected: null,
    }
  }

  getSvgContent(svgElement) {
    if (svgElement == null) {
      return;
    }

    this.props.onSvgContentChange(svgElement.outerHTML);
  }

  handleDrawableMouseDown(e) {
    if (this.state.dragging != null) {
      return;
    }

    const drawable = this.props.drawables.find(e.target.dataset.id);
    this.setState({
      mouseDownAt: Date.now(),
      dragging: drawable.id,
      initialX: e.clientX,
      initialY: e.clientY,
      initialPosX: drawable.x,
      initialPosY: drawable.y,
      offsetX: drawable.x,
      offsetY: drawable.y,
    });
  }

  handleMouseMove(e) {
    if (this.state.dragging == null) {
      return;
    }

    this.setState({
      offsetX: this.state.initialPosX + e.clientX - this.state.initialX,
      offsetY: this.state.initialPosY + e.clientY - this.state.initialY,
      selected: this.state.dragging,
    })
  }

  handleMouseUp(e) {
    const clickTime = Date.now() - this.state.mouseDownAt;

    // User clicked fast
    if (clickTime <= 250) {
      this.setState({
        dragging: null,
        mouseDownAt: null,
        selected: this.state.dragging,
      })
    } else {
      this.handleMouseDrop(e);
    }
  }

  handleMouseDrop(e) {
    if (this.state.dragging == null) {
      return;
    }

    const rect = this.props.drawables.find(this.state.dragging);
    this.props.onDrop(rect, {
      x: this.state.offsetX,
      y: this.state.offsetY,
    });

    this.setState({
      dragging: null,
      mouseDownAt: null,
    });
  }

  handleSVGMouseDown(e) {
    if (e.target.tagName !== 'svg') {
      return;
    }

    this.setState({
      mouseDownAt: Date.now(),
      dragging: null,
      initialX: e.clientX,
      initialY: e.clientY,
    });
  }

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        ref={this.getSvgContent.bind(this)}
        onMouseDown={this.handleSVGMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
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
      const { id } = drawable;
      let offsetX;
      let offsetY;
      const dragging = id == this.state.dragging;
      const selected = id == this.state.selected;

      if (dragging) {
        ({ offsetX, offsetY } = this.state);
      }

      switch(drawable.type) {
        case "Rectangle":
          return <Rect
            key={drawable.id}
            offsetX={offsetX}
            offsetY={offsetY}
            onMouseDown={this.handleDrawableMouseDown.bind(this)}
            rect={drawable}
            selected={selected}
          />
      }
    });
  }
}

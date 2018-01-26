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
      dragging: null,
    }
  }

  getSvgContent(svgElement) {
    if (svgElement == null) {
      return;
    }

    this.props.onSvgContentChange(svgElement.outerHTML);
  }

  handleMouseDown(e) {
    if (this.state.dragging != null) {
      return;
    }

    const drawable = this.props.drawables.find(e.target.dataset.id);
    this.setState({
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
    })
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

    this.setState({ dragging: null });
  }

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        ref={this.getSvgContent.bind(this)}
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
      let offsetX;
      let offsetY;
      const dragging = drawable.id == this.state.dragging;

      if (dragging) {
        ({ offsetX, offsetY } = this.state);
      }

      switch(drawable.type) {
        case "Rectangle":
          return <Rect
            key={drawable.id}
            offsetX={offsetX}
            offsetY={offsetY}
            onMouseDown={this.handleMouseDown.bind(this)}
            rect={drawable}
          />
      }
    });
  }
}

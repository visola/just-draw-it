import PropTypes from 'prop-types';
import React from 'react';

export default class Canvas extends React.Component {
  static propTypes = {
    onRectDrop: PropTypes.func.isRequired,
    onSvgContentChange: PropTypes.func.isRequired,
    rects: PropTypes.array.isRequired,
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

    this.props.onSvgContentChange(svgElement.innerHTML);
  }

  handleMouseDown(e) {
    if (this.state.dragging != null) {
      return;
    }

    this.setState({
      dragging: e.target.dataset.id,
      initialX: e.clientX,
      initialY: e.clientY,
      offsetX: e.clientX,
      offsetY: e.clientY,
    });
  }

  handleMouseMove(e) {
    if (this.state.dragging == null) {
      return;
    }

    this.setState({
      offsetX: e.clientX,
      offsetY: e.clientY,
    })
  }

  handleMouseDrop(e) {
    if (this.state.dragging == null) {
      return;
    }

    const rect = this.props.rects.find((r) => r.id == this.state.dragging);
    const { x, y } = rect;
    this.props.onRectDrop(rect, {
      x: rect.x + this.state.offsetX - this.state.initialX,
      y: rect.y + this.state.offsetY - this.state.initialY,
    });

    this.setState({ dragging: null });
  }

  render() {
    return (
      <svg
        ref={this.getSvgContent.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseDrop.bind(this)}
        onMouseLeave={this.handleMouseDrop.bind(this)}
        width="500"
        height="500"
      >
        {this.renderRects()}
      </svg>
    );
  }

  renderRects() {
    return this.props.rects.map((rect) => {
      const { id } = rect;
      let { x, y } = rect;
      const dragging = this.state.dragging == id;

      if (dragging) {
        x = x + this.state.offsetX - this.state.initialX;
        y = y + this.state.offsetY - this.state.initialY;
      }

      if (isNaN(x) || isNaN(y)) {
        return null;
      }

      return <rect
        className={dragging ? 'dragging' : ''}
        data-id={rect.id}
        key={rect.id}
        onMouseDown={this.handleMouseDown.bind(this)}
        height={rect.height}
        width={rect.width}
        x={x}
        y={y}
      />
    });
  }
}

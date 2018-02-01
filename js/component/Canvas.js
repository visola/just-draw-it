import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import ControlPoint from './ControlPoint';
import Rect from './Rect';
import Rectangle from '../models/Rectangle';
import SelectionBox from './SelectionBox';

@observer
export default class Canvas extends React.Component {
  static propTypes = {
    onDrawableSelected: PropTypes.func.isRequired,
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

  getCoords(drawable) {
    if (this.state.dragging && this.state.dragging.id == drawable.id) {
      return {
        x: this.state.offsetX,
        y: this.state.offsetY,
      };
    }

    return {
      x: drawable.x,
      y: drawable.y,
    };
  }

  getElementClicked(x, y) {
    const elements = document.elementsFromPoint(x, y);
    let result = null;
    elements.reverse().forEach((e) => {
      const isDrawable = e.dataset.drawable === "true";
      const isControl = e.dataset.control === "true";
      if (isDrawable) {
        result = { drawable: true, element: e };
      }
      if (isControl) {
        result = { control: true, element: e };
      }
    });
    return result;
  }

  getSvgContent(svgElement) {
    if (svgElement == null) {
      return;
    }

    this.props.onSvgContentChange(svgElement.outerHTML);
  }

  handleDrawableMouseDown(e, drawableId) {
    if (this.state.dragging != null) {
      return;
    }

    const drawable = this.props.drawables.find(drawableId);
    this.setState({
      mouseDownAt: Date.now(),
      dragging: drawable,
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

    this.triggerOnDrawableSelected(this.state.dragging);
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
      this.triggerOnDrawableSelected(this.state.dragging);
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

    const rect = this.state.dragging;
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
    const clickedResult = this.getElementClicked(e.clientX, e.clientY);
    if (clickedResult !== null && clickedResult.drawable === true) {
      this.handleDrawableMouseDown(e, clickedResult.element.dataset.id);
    } else {
      // clicked outside everything
      this.setState({
        mouseDownAt: Date.now(),
        dragging: null,
        initialX: e.clientX,
        initialY: e.clientY,
      });
    }
  }

  render() {
    return (
      <svg
        className="canvas"
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
        {this.renderSelectionBoxWithControls()}
      </svg>
    );
  }

  renderDrawables() {
    return this.props.drawables.map((drawable) => {
      const { id } = drawable;
      const { x, y } = this.getCoords(drawable);

      switch(drawable.type) {
        case "Rectangle":
          return <Rect key={drawable.id} x={x} y={y} rect={drawable} />
      }
    });
  }

  renderSelectionBoxWithControls() {
    if (this.state.selected) {
      const { height, width } = this.state.selected;
      const { x, y } = this.getCoords(this.state.selected);
      const halfHeight = height / 2;
      const halfWidth = width / 2;
      return <g transform={`translate(${x},${y})`}>
        <SelectionBox height={height} width={width} />
        <ControlPoint x={0} y={0} /> {/* top left */}
        <ControlPoint x={halfWidth} y={0} /> {/* top middle */}
        <ControlPoint x={width} y={0} /> {/* top right */}
        <ControlPoint x={width} y={height / 2} /> {/* middle right */}
        <ControlPoint x={width} y={height} /> {/* bottom right */}
        <ControlPoint x={halfWidth} y={height} /> {/* bottom middle */}
        <ControlPoint x={0} y={height} /> {/* bottom left */}
        <ControlPoint x={0} y={halfHeight} /> {/* middle left */}
      </g>;
    }

    return null;
  }

  triggerOnDrawableSelected(drawable) {
    if (drawable !== this.state.selected) {
      this.props.onDrawableSelected(drawable);
    }
  }
}

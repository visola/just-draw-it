import classnames from 'classnames';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { SketchPicker } from 'react-color';

import ColorsIcon from '../icons/ColorsIcon';

@observer
export default class StrokeWidthToolComponent extends React.Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tool: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      pickingFill: false,
      pickingStroke: false,
    };
  }

  handleBlur() {
    this.setState({
      pickingFill: false,
      pickingStroke: false,
    });
  }

  handleColorChange({ hex }) {
    if (this.state.pickingFill) {
      this.props.tool.setFillColor(hex);
    } else {
      this.props.tool.setStrokeColor(hex);
    }
  }

  handleClickStroke() {
    this.setState({ pickingStroke: true });
  }

  handleClickFill() {
    this.setState({ pickingFill: true });
  }

  render() {
    const { fillColor, strokeColor } = this.props.tool;
    return (
      <div>
        <button
          className={classnames({ btn: true, 'btn-default': true, active: this.props.selected })}
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
    const { pickingFill, pickingStroke } = this.state;
    if (pickingFill || pickingStroke) {
      let color = this.props.tool.fillColor;
      if (pickingStroke) {
        color = this.props.tool.strokeColor;
      }
      return <div tabIndex="-1" onBlur={this.handleBlur.bind(this)} ref={(div) => div && div.focus()}>
        <SketchPicker color={color} onChange={this.handleColorChange.bind(this)} />
      </div>;
    }

    return null;
  }
}

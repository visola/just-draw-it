import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';
import React from 'react';

class ColorPicker extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onColorChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super();
    this.state = {
      color: props.color,
      open: false,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ color: newProps.color });
  }

  handleColorChanged(color) {
    this.setState({ color: color.hex });
    this.props.onColorChange(color.hex);
  }

  hide() {
    this.setState({ open: false });
  }

  open() {
    this.setState({ open: true });
  }

  render() {
    let picker = null;

    if (this.state.open) {
      picker = (
      <SketchPicker
        color={this.state.color}
        onChange={this.handleColorChanged.bind(this)}
      />);
    }

    return <div className="btn btn-default color-picker" tabIndex="0" onBlur={this.hide.bind(this)}>
      <span
          style={{ background: this.state.color }}
          onClick={this.open.bind(this)}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      {picker}
    </div>;
  }
}

export default ColorPicker;
